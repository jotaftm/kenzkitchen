import { Express } from "express";
import { companyRouter } from "./company.route";

export const initializerRouter = (app: Express) => {
    app.use("/companies", companyRouter());
};
