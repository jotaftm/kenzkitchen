import express from "express";
import "reflect-metadata";
import { initializerRouter } from "./routes";

const app = express();

app.use(express.json());

initializerRouter(app);

export default app;