import { Express } from "express";
import { companyRouter } from "./company.route";
import { userRouter } from "./user.route";

export const initializerRouter = (app: Express) => {
  app.use("/companies", companyRouter());
  app.use("/users", userRouter());
};
