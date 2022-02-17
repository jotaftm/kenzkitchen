import { Router } from "express";
import {
  create,
  exclude,
  list,
  listOne,
  login,
  update,
} from "../controllers/user.controller";
import {
  authenticateApiKeyOrToken,
  authenticateUser,
} from "../middlewares/authentication.middleware";
import { validate } from "../middlewares/validation.middleware";
import { userSchema } from "../schemas/user/create.schema";
import { loginUserSchema } from "../schemas/user/login.schema";
import { updateUserSchema } from "../schemas/user/update.schema";

const router = Router({ mergeParams: true });

export const userRouter = () => {
  router.post("", authenticateUser, validate(userSchema), create);
  router.post("/login", validate(loginUserSchema), login);
  router.get("", authenticateApiKeyOrToken, list);
  router.get("/:userId", authenticateApiKeyOrToken, listOne);
  router.patch(
    "/:userId",
    authenticateApiKeyOrToken,
    validate(updateUserSchema),
    update
  );
  router.delete("/:userId", authenticateApiKeyOrToken, exclude);

  return router;
};
