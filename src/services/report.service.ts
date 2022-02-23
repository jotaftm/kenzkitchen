import { getRepository } from "typeorm";
import { Order } from "../entities";
import ejs from "ejs";
import pdf from "html-pdf";
import { ErrorHandler } from "./../errors/errorHandler.error";

export const createReport = async (orderId: string) => {
  const orderRepository = getRepository(Order);

  //   const order = await orderRepository.findOne(orderId);

  ejs.renderFile("../templates/report.ejs", {}, (err, html) => {
    if (err) {
      console.log(err);
    } else {
      console.log(html);
    }

    //   pdf.create(html, {}).toFile("../uploads/report.ts", (error, response) => {
    //     if (error) {
    //       console.log("aquiii", error);
    //     }
    //   });
  });
};
