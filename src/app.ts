import express from "express";
import "reflect-metadata";
import { initializerRouter } from "./routes";
import { handleError } from "./middlewares/error.middleware";
import dotenv from "dotenv";
import { connectDatabase } from "./database/index";
import expressLayouts from "express-ejs-layouts";

dotenv.config();

connectDatabase();

const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(expressLayouts);

import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "../docs/build_swagger.json";

initializerRouter(app);

app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

app.use(handleError);

export default app;
