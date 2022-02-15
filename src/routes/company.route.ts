import { Router } from "express";
import { create } from "../controllers/company.controller";

const router = Router({ mergeParams: true });

export const companyRouter = () => {
    router.post('', create);
    // router.post('/login', );
    // router.get('', );
    // router.get('/:id', );
    // router.patch('/:id', );
    // router.delete('/:id', );

    return router;
};