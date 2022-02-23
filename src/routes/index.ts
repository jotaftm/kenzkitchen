import { Express } from "express";
import { companyRouter } from "./company.route";
import { recipeRouter } from "./recipe.route";
import { userRouter } from "./user.route";
import { ingredientRouter } from "./ingredient.route";
import { reportRouter } from "./report.route";
import { orderRouter } from "./order.route";

export const initializerRouter = (app: Express) => {
  app.use("/companies", companyRouter());
  app.use("/companies/:companyId/users", userRouter());
  app.use("/companies/:companyId/ingredients", ingredientRouter());
  app.use("/companies/:companyId/recipes", recipeRouter());
  app.use("/companies/:companyId/orders", orderRouter());
  app.use("/companies/:companyId/orders/:id/report", reportRouter());
};
