import { ErrorHandler } from "./../errors/errorHandler.error";
import { getRepository } from "typeorm";
import {
  User,
  Ingredient,
  Recipe,
  Order,
  RecipeIngredient,
  OrderRecipe,
  OrderIngredient,
} from "../entities";

export const createOrder = async (idLogged: string, body: any) => {
  const userRepository = getRepository(User);
  const orderRepository = getRepository(Order);

  // criando registro na tabela orders
  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  body.scheduled = new Date(body.scheduled);

  const order = orderRepository.create({
    ...(body as Order),
    owner: user,
    company: user?.company,
  });

  await orderRepository.save(order);

  // criando registro na tabela ordersRecipes
  const orderRecipeRepository = getRepository(OrderRecipe);

  for (const recipe in body.recipesListAdd) {
    const orderRecipe = orderRecipeRepository.create({
      order: order,
      recipe: { id: recipe },
      quantity: body.recipesListAdd[recipe],
    });

    await orderRecipeRepository.save(orderRecipe);
  }

  // criar registro na tabela ordersIngredients

  // newOrder que será exibido na resposta
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
