import { authenticateApiKey } from "./middlewares/authentication.middleware";
import express from "express";
import "reflect-metadata";
import { initializerRouter } from "./routes";
import { handleError } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

initializerRouter(app);

app.use(handleError);

export default app;
