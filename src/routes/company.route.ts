import { Router } from "express";
import { create, exclude, list, listOne, login, update } from "../controllers/company.controller";
import { authenticateApiKey, authenticateApiKeyOrToken } from "../middlewares/authentication.middleware";
import { validate } from "../middlewares/validation.middleware";
import { companySchema } from "../schemas/company/create.schema";
import { loginCompanySchema } from "../schemas/company/login.schema";
import { updateCompanySchema } from "../schemas/company/update.schema";

const router = Router({ mergeParams: true });

export const companyRouter = () => {
    router.post('', authenticateApiKey, validate(companySchema), create);
    router.post('/login', validate(loginCompanySchema), login);
    router.get('', authenticateApiKey, list);
    router.get('/:id', authenticateApiKeyOrToken, listOne);
    router.patch('/:id', authenticateApiKeyOrToken, validate(updateCompanySchema), update);
    router.delete('/:id', authenticateApiKeyOrToken, exclude);

    return router;
};