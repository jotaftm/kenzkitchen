import { NextFunction, Request, Response } from "express";
import { createCompany, deleteCompany, findCompany, listCompanies, loginCompany, updateCompany } from "../services/company.service";


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const createdBy = req.idLogged;

        const newCompany = await createCompany(createdBy, req.body);
        
        res.status(201).json(newCompany);
    } catch (err) {
        next(err);
    };
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await loginCompany(req.body);

        res.json({ token });
    } catch (err) {
        next(err);
    };
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const companiesList = await listCompanies();

        res.json(companiesList);
    } catch (err) {
        next(err);
    };
};

export const listOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idLogged = req.idLogged;

        const searchedId = req.params.id;

        const company = await findCompany(idLogged, searchedId);

        res.json(company);
    } catch (err) {
        next(err);
    };
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idLogged = req.idLogged;

        const body = req.body;

        const updatedId = req.params.id;

        const companyUpdated = await updateCompany(idLogged, body, updatedId);

        res.json(companyUpdated);
    } catch (err) {
        next(err);
    };
};

export const exclude = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const idLogged = req.idLogged;

        const deletedId = req.params.id;

        await deleteCompany(idLogged, deletedId);

        res.status(204).json();
    } catch (err) {
        next(err);
    };
};