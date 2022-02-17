import { authenticateApiKey } from "./middlewares/authentication.middleware";
import express from "express";
import "reflect-metadata";
import { initializerRouter } from "./routes";
import { handleError } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

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
