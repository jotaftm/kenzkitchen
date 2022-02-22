import { ErrorHandler } from "./../errors/errorHandler.error";
import { getRepository } from "typeorm";
import {
  Ingredient,
  Order,
  OrderIngredient,
  OrderRecipe,
  Recipe,
  RecipeIngredient,
  User,
} from "../entities";

// função para calcular ingredientes

const calculateIngredients = async (
  ordersRecipes: OrderRecipe[],
  isRemoved: boolean
) => {
  const recipeIngredientRepository = getRepository(RecipeIngredient);
  const orderIngredientRepository = getRepository(OrderIngredient);

  ordersRecipes.map(async (orderRecipe) => {
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
        if (isRemoved) {
          quantityIngredient -= orderIngredientExist.quantity;
        } else {
          quantityIngredient += orderIngredientExist.quantity;
        }

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
};
// função para calcular ingredientes

export const createOrder = async (idLogged: string, body: any) => {
  const userRepository = getRepository(User);
  const orderRepository = getRepository(Order);
  const orderRecipeRepository = getRepository(OrderRecipe);

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

  // chamando função para calcular ingredientes
  await calculateIngredients(ordersRecipesExistes, false);

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
  const ingredientRepository = getRepository(Ingredient);
  const orderIngredientRepository = getRepository(OrderIngredient);
  const recipeRepository = getRepository(Recipe);
  const orderRecipeRepository = getRepository(OrderRecipe);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  const orderToUpdate = await orderRepository.findOne(orderId, {
    where: { company: user?.company },
  });

  if (!orderToUpdate) {
    throw new ErrorHandler("order not found", 404);
  }

  if ("isExecuted" in body) {
    if (orderToUpdate.isExecuted === body.isExecuted) {
      console.log(orderToUpdate.isExecuted, body.isExecuted);
      if (body.isExecuted) {
        throw new ErrorHandler("this order has already been executed", 400);
      } else {
        throw new ErrorHandler("this order has not yet been executed", 400);
      }
    } else {
      orderRepository.merge(orderToUpdate, body);
      const orderUpdated = await orderRepository.save(orderToUpdate);

      const ordersIngredientsExists = await orderIngredientRepository.find({
        where: { order: orderUpdated },
        relations: ["ingredient"],
      });
      ordersIngredientsExists.map(async (orderIngredient) => {
        const ingredientExists = await ingredientRepository.findOne(
          orderIngredient.ingredient
        );
        if (ingredientExists) {
          if (body.isExecuted) {
            ingredientExists.quantity -= orderIngredient.quantity;
          } else {
            ingredientExists.quantity += orderIngredient.quantity;
          }

          await ingredientRepository.save(ingredientExists);
        }
      });
    }
  }

  // Adicionando e removendo recipes de uma order

  const ordersRecipesExists = await orderRecipeRepository.find({
    relations: ["recipe", "order"],
  });

  if ("recipesListAdd" in body) {
    for (const recipeId in body.recipesListAdd) {
      const recipeExists = await recipeRepository.findOne({
        where: { id: recipeId },
      });

      if (recipeExists) {
        const orderRecipeExist = ordersRecipesExists.find((orderRecipe) => {
          return (
            orderRecipe.recipe.id === recipeId &&
            orderRecipe.order.id === orderToUpdate.id
          );
        });

        if (orderRecipeExist) {
          await orderRecipeRepository.update(orderRecipeExist.id, {
            quantity: body.recipesListAdd[recipeId],
          });

          await calculateIngredients([orderRecipeExist], false);
        } else {
          const newOrderRecipe = orderRecipeRepository.create({
            quantity: body.recipesListAdd[recipeId],
            recipe: recipeExists,
            order: orderToUpdate,
          });

          const orderRecipe = await orderRecipeRepository.save(newOrderRecipe);

          await calculateIngredients([orderRecipe], false);
        }
      }
    }
  }

  if ("recipesListRemove" in body) {
    body.recipesListRemove.map(async (recipeId: string) => {
      const orderRecipeForDelete = ordersRecipesExists.find((orderRecipe) => {
        return (
          orderRecipe.recipe.id === recipeId &&
          orderRecipe.order.id === orderToUpdate.id
        );
      });

      if (orderRecipeForDelete) {
        await orderRecipeRepository.delete(orderRecipeForDelete.id);

        await calculateIngredients([orderRecipeForDelete], true);
      }
    });
  }

  // Adicionando e removendo recipes de uma order

  if (body.scheduled) {
    body.scheduled = new Date(body.scheduled);
    orderRepository.merge(orderToUpdate, body);
    await orderRepository.save(orderToUpdate);
  }

  return await orderRepository.findOne(orderId);
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
