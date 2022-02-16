import { Router } from "express";
import {
  create,
  exclude,
  list,
  listOne,
  login,
  update,
} from "../controllers/user.controller";
import { authenticateApiKeyOrToken } from "../middlewares/authentication.middleware";
import { validate } from "../middlewares/validation.middleware";
import { userSchema } from "../schemas/user/create.schema";
import { loginUserSchema } from "../schemas/user/login.schema";
import { updateUserSchema } from "../schemas/user/update.schema";

const router = Router({ mergeParams: true });

export const userRouter = () => {
  router.post("", authenticateApiKeyOrToken, validate(userSchema), create);
  router.post("/login", validate(loginUserSchema), login);
  router.get("", authenticateApiKeyOrToken, list);
  router.get("/:id", authenticateApiKeyOrToken, listOne);
  router.patch(
    "/:id",
    authenticateApiKeyOrToken,
    validate(updateUserSchema),
    update
  );
  router.delete("/:id", authenticateApiKeyOrToken, exclude);

  return router;
};
