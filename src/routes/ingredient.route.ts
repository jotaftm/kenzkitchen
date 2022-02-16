import { Router } from "express";
import {
  create,
  list,
  listOne,
  update,
  exclude,
} from "../controllers/ingredient.controller";

const router = Router({ mergeParams: true });

export const ingredientRouter = () => {
  router.post("", create);
  router.get("", list);
  router.get("/:id", listOne);
  router.patch("/:id", update);
  router.delete("/:id", exclude);

  return router;
};
