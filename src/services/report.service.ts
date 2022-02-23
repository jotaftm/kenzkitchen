import { getRepository } from "typeorm";
import { Order } from "../entities";
import ejs from "ejs";
import pdf from "html-pdf";
import { ErrorHandler } from "./../errors/errorHandler.error";

export const createReport = async (orderId: string) => {
  const orderRepository = getRepository(Order);
  const order = await orderRepository.findOne(orderId);

  if (!order) {
    throw new ErrorHandler("not found", 404);
  }
  console.log(order);

  // ejs.renderFile(
  //   "./src/templates/report.ejs",
  //   { name: order.id },
  //   (err, html) => {
  //     if (err) {
  //       console.log(err);
  //     }

  //     pdf.create(html, {}).toFile("./src/uploads/report.pdf", (err, res) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(res);
  //       }
  //     });
  //   }
  // );
};
