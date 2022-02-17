import { Express } from "express";
import { companyRouter } from "./company.route";
import { recipeRouter } from "./recipe.route";

export const initializerRouter = (app: Express) => {
  app.use("/companies", companyRouter());
  app.use("/companies/:companyId/recipes", recipeRouter());
};
