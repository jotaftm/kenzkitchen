import { ErrorHandler } from "./../errors/errorHandler.error";
import { getRepository } from "typeorm";
import {
  Order,
  OrderIngredient,
  OrderRecipe,
  RecipeIngredient,
  User,
} from "../entities";

export const createOrder = async (idLogged: string, body: any) => {
  const userRepository = getRepository(User);
  const orderRepository = getRepository(Order);
  const orderRecipeRepository = getRepository(OrderRecipe);
  const recipeIngredientRepository = getRepository(RecipeIngredient);
  const orderIngredientRepository = getRepository(OrderIngredient);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  body.scheduled = new Date(body.scheduled);

  const order = orderRepository.create({
    ...(body as Order),
    owner: user,
    company: user?.company,
  });

  const orderCreated = await orderRepository.save(order);

  for (const recipe in body.recipesListAdd) {
    const orderRecipe = orderRecipeRepository.create({
      order: order,
      recipe: { id: recipe },
      quantity: body.recipesListAdd[recipe],
    });

    await orderRecipeRepository.save(orderRecipe);
  }

  const ordersRecipesExistes = await orderRecipeRepository.find({
    where: { order: orderCreated },
  });

  ordersRecipesExistes.map(async (orderRecipe) => {
    const recipesIngredientsExistes = await recipeIngredientRepository.find({
      where: { recipe: orderRecipe.recipe },
    });

    recipesIngredientsExistes.map(async (recipeIngredient) => {
      let quantityIngredient =
        (orderRecipe.quantity / orderRecipe.recipe.yield) *
        recipeIngredient.quantity;

      const orderIngredientExist = await orderIngredientRepository.findOne({
        where: {
          ingredient: recipeIngredient.ingredient,
          order: orderRecipe.order,
        },
      });

      if (orderIngredientExist) {
        quantityIngredient += orderIngredientExist.quantity;

        await orderIngredientRepository.update(orderIngredientExist.id, {
          quantity: quantityIngredient,
        });
      } else {
        const newOrderIngredient = orderIngredientRepository.create({
          quantity: quantityIngredient,
          ingredient: recipeIngredient.ingredient,
          order: orderRecipe.order,
        });

        await orderIngredientRepository.save(newOrderIngredient);
      }
    });
  });

  const newOrder = await orderRepository.findOne({
    join: {
      alias: "orders",
      leftJoinAndSelect: {
        ordersRecipes: "orders.ordersRecipes",
        recipes: "ordersRecipes.recipe",
      },
    },
    where: { id: order.id },
  });

  return newOrder;
};

export const listOrders = async (idLogged: string) => {
  const userRepository = getRepository(User);
  const orderRepository = getRepository(Order);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  const orders = await orderRepository.find({
    join: {
      alias: "orders",
      leftJoinAndSelect: {
        ordersRecipes: "orders.ordersRecipes",
        recipes: "ordersRecipes.recipe",
      },
    },
    where: { company: user?.company },
  });

  return orders;
};

export const listOrdersByDate = async (idLogged: string, scheduled: string) => {
  if (!scheduled.match(/^(\d{4})\/(\d{2})\/(\d{2})$/)) {
    throw new ErrorHandler("invalid scheduled format", 400);
  }
  const date = new Date(scheduled);

  const userRepository = getRepository(User);
  const orderRepository = getRepository(Order);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  const orders = await orderRepository.find({
    join: {
      alias: "orders",
      leftJoinAndSelect: {
        ordersRecipes: "orders.ordersRecipes",
        recipes: "ordersRecipes.recipe",
      },
    },
    where: { company: user?.company, scheduled: date },
  });

  return orders;
};

export const findOrder = async (idLogged: string, orderId: string) => {
  const userRepository = getRepository(User);
  const orderRepository = getRepository(Order);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  const order = await orderRepository.findOne(orderId, {
    join: {
      alias: "orders",
      leftJoinAndSelect: {
        ordersRecipes: "orders.ordersRecipes",
        recipes: "ordersRecipes.recipe",
      },
    },
    where: { company: user?.company },
  });

  if (!order) {
    throw new ErrorHandler("order not found", 404);
  }

  return order;
};

export const updateOrder = async (
  idLogged: string,
  orderId: string,
  body: any
) => {
  const userRepository = getRepository(User);
  const orderRepository = getRepository(Order);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  const orderToUpdate = await orderRepository.findOne(orderId, {
    where: { company: user?.company },
  });

  if (!orderToUpdate) {
    throw new ErrorHandler("order not found", 404);
  }

  orderRepository.merge(orderToUpdate, body);
  const order = await orderRepository.save(orderToUpdate);

  return order;
};

export const deleteOrder = async (idLogged: string, orderId: string) => {
  const userRepository = getRepository(User);
  const orderRepository = getRepository(Order);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  const orderToDelete = await orderRepository.findOne(orderId, {
    where: { company: user?.company },
  });

  if (!orderToDelete) {
    throw new ErrorHandler("order not found", 404);
  }

  await orderRepository.delete(orderId);
};
