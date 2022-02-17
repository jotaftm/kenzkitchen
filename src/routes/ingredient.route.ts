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
import { updateIngredientSchema } from "./../schemas/ingredient/update.schema";
import { authenticateUser } from "./../middlewares/authentication.middleware";

const router = Router({ mergeParams: true });

export const ingredientRouter = () => {
  router.post("", authenticateUser, validate(createIngredientSchema), create);
  router.get("", authenticateUser, list);
  router.get("/:ingredientId", authenticateUser, listOne);
  router.patch(
    "/:ingredientId",
    authenticateUser,
    validate(updateIngredientSchema),
    update
  );
  router.delete("/:ingredientId", authenticateUser, exclude);

  return router;
};
