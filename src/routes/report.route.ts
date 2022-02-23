import { Router } from "express";
import { download } from "./../controllers/report.controller";

const router = Router();

export const reportRouter = () => {
  router.get("", download);

  return router;
};
