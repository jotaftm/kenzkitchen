import { authenticateUser } from "./../middlewares/authentication.middleware";
import { Router } from "express";
import { generate } from "./../controllers/report.controller";

const router = Router({ mergeParams: true });

export const reportRouter = () => {
  router.get("", authenticateUser, generate);

  return router;
};
