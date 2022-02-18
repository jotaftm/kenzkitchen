import { Express } from "express";
import { companyRouter } from "./company.route";
import { recipeRouter } from "./recipe.route";
import { userRouter } from "./user.route";
import { ingredientRouter } from "./ingredient.route";

export const initializerRouter = (app: Express) => {
  app.use("/companies", companyRouter());
  app.use("/companies/:companyId/users", userRouter());
  app.use("/companies/:companyId/ingredients", ingredientRouter());
  app.use("/companies/:companyId/recipes", recipeRouter());
};
