import { Router } from "express";
import {
  create,
  list,
  listOne,
  update,
  exclude,
} from "../controllers/order.controller";

const router = Router({ mergeParams: true });

export const orderRouter = () => {
  router.post("", create);
  router.get("", list);
  router.get("", listOne);
  router.patch("", update);
  router.delete("", exclude);
};
