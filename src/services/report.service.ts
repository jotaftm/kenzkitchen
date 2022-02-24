import { getRepository } from "typeorm";
import { Order, OrderIngredient, User } from "../entities";
import ejs from "ejs";
import pdf from "html-pdf";
import { ErrorHandler } from "./../errors/errorHandler.error";
import { Response } from "express";

export const generateReport = async (
  idLogged: string,
  orderId: string,
  res: Response
) => {
  const userRepository = getRepository(User);
  const orderRepository = getRepository(Order);
  const orderIngredientRepository = getRepository(OrderIngredient);

  const order = await orderRepository.findOne(orderId, {
    relations: ["ordersRecipes"],
  });

  if (order?.isExecuted) {
    throw new ErrorHandler("this order has already been executed", 400);
  }

  if (!order) {
    throw new ErrorHandler("order not found", 404);
  }

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  const ordersIngredients = await orderIngredientRepository.find({
    where: { order: order },
    relations: ["ingredient"],
  });

  ejs.renderFile(
    "./src/templates/report.ejs",
    {
      company: user?.company.name,
      cnpj: user?.company.cnpj,
      user: user?.name,
      orderId: orderId,
      ordersIngredients: ordersIngredients,
      date: `${order.createdAt.getDate()}/${
        order.createdAt.getMonth() + 1
      }/${order.createdAt.getFullYear()}`,
      scheduled: `${order.scheduled.getDate()}/${
        order.scheduled.getMonth() + 1
      }/${order.scheduled.getFullYear()}`,
    },
    (err, html) => {
      if (err) {
        throw new ErrorHandler("failed to generate report", 500);
      }

      pdf
        .create(html, {
          format: "A4",
          border: {
            right: "40",
            left: "40",
            top: "20",
            bottom: "20",
          },
        })
        .toStream((err, stream) => {
          if (err) {
            throw new ErrorHandler("failed to generate report", 500);
          }
          res.type("pdf");
          stream.pipe(res);
        });
    }
  );
};
