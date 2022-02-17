import { Router } from "express";
import {
  create,
  exclude,
  listAll,
  listOne,
  update,
} from "../controllers/recipe.controller";
import { validate } from "../middlewares/validation.middleware";

const router = Router({ mergeParams: true });

export const recipeRouter = () => {
  router.post("", create);
  router.get("", listAll);
  router.get("/:id", listOne);
  router.patch("/:id", update);
  router.delete("/:id", exclude);

  return router;
};
