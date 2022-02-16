import { updateIngredientSchema } from "./../schemas/ingredient/update.schema";
import { Router } from "express";
import {
  create,
  list,
  listOne,
  update,
  exclude,
} from "../controllers/ingredient.controller";
import { validate } from "./../middlewares/validation.middleware";
import { createIngredientSchema } from "./../schemas/ingredient/create.schema";

const router = Router({ mergeParams: true });

export const ingredientRouter = () => {
  router.post("", validate(createIngredientSchema), create);
  router.get("", list);
  router.get("/:id", listOne);
  router.patch("/:id", validate(updateIngredientSchema), update);
  router.delete("/:id", exclude);

  return router;
};
