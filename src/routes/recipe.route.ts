import { Router } from "express";
import {
  create,
  exclude,
  listAll,
  listOne,
  update,
} from "../controllers/recipe.controller";
import { authenticateUser } from "../middlewares/authentication.middleware";
import { validate } from "../middlewares/validation.middleware";
import { createRecipeSchema } from "../schemas/recipe/create.schema";
import { updateRecipeSchema } from "../schemas/recipe/update.schema";

const router = Router({ mergeParams: true });

export const recipeRouter = () => {
  router.post("", authenticateUser, validate(createRecipeSchema), create);
  router.get("", authenticateUser, listAll);
  router.get("/:recipeId", authenticateUser, listOne);
  router.patch(
    "/:recipeId",
    authenticateUser,
    validate(updateRecipeSchema),
    update
  );
  router.delete("/:recipeId", exclude);

  return router;
};
