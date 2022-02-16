import { Express } from "express";
import { companyRouter } from "./company.route";
import { ingredientRouter } from "./ingredient.route";

export const initializerRouter = (app: Express) => {
  app.use("/companies", companyRouter());
  app.use("/ingredients", ingredientRouter());
};
