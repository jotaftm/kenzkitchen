import express from "express";
import "reflect-metadata";
import { initializerRouter } from "./routes";

const app = express();

initializerRouter(app);

app.use(express.json());

export default app;
