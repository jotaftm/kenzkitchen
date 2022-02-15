import { NextFunction, Request, Response } from "express";
import { createCompany } from "../services/company.service";


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCompany = await createCompany(req.body);
        
        res.status(201).json(newCompany);
    } catch (error) {
        next(error);
    };
};