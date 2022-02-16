import { Express } from "express";
import { ingredientRouter } from "./ingredient.route";

export const initializerRouter = (app: Express) => {
  app.use("/ingredients", ingredientRouter());
};
