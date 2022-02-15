import { Router } from "express";

const router = Router({ mergeParams: true });

export const companyRouter = () => {
    router.post('/companies', );
    router.post('/companies/login', );
    router.get('/companies', );
    router.get('/companies/:id', );
    router.patch('/companies/:id', );
    router.delete('/companies/:id', );

    return router;
};