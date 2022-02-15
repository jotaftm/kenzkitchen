import express from "express";
import "reflect-metadata";
import { initializerRouter } from "./routes";
import { handleError } from "./middlewares/error.middleware";

const app = express();

initializerRouter(app);

app.use(express.json());

app.use(handleError);

export default app;
