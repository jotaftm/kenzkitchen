import { Router } from "express";
import {
  create,
  list,
  listOne,
  update,
  exclude,
} from "../controllers/order.controller";
import { authenticateUser } from "./../middlewares/authentication.middleware";
import { validate } from "./../middlewares/validation.middleware";
import { createOrderSchema } from "./../schemas/order/create.schema";

const router = Router({ mergeParams: true });

export const orderRouter = () => {
  router.post("", authenticateUser, validate(createOrderSchema), create);
  router.get("", authenticateUser, list);
  router.get("/:orderId", authenticateUser, listOne);
  router.patch("/:orderId", authenticateUser, update);
  router.delete("/:orderId", authenticateUser, exclude);

  return router;
};
