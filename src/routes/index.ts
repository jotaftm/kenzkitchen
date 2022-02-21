import { Express } from "express";
import { companyRouter } from "./company.route";
import { userRouter } from "./user.route";
import { ingredientRouter } from "./ingredient.route";
import { orderRouter } from "./order.route";

export const initializerRouter = (app: Express) => {
  app.use("/companies", companyRouter());
  app.use("/companies/:companyId/users", userRouter());
  app.use("/companies/:companyId/ingredients", ingredientRouter());
  app.use("/companies/:companyId/orders", orderRouter());
};
