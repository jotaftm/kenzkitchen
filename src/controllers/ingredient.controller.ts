import { Request, Response, NextFunction } from "express";
import {
  createIngredient,
  listIngredients,
  findIngredient,
  updateIngredient,
  deleteIngredient,
} from "../services/ingredient.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idLogged = req.idLogged;
    const companyId = req.params.companyId;
    const body = req.body;

    const newIngredient = await createIngredient(idLogged, companyId, body);

    res.status(201).json(newIngredient);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const companyId = req.params.companyId;

    const ingredientsList = await listIngredients(companyId);

    res.json(ingredientsList);
  } catch (err) {
    next(err);
  }
};

export const listOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const companyId = req.params.companyId;
    const ingredientId = req.params.ingredientId;

    const ingredient = await findIngredient(companyId, ingredientId);

    res.json(ingredient);
  } catch (err) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const companyId = req.params.companyId;
    const ingredientId = req.params.ingredientId;
    const body = req.body;

    const ingredientUpdated = await updateIngredient(
      companyId,
      ingredientId,
      body
    );

    res.json(ingredientUpdated);
  } catch (err) {
    next(err);
  }
};

export const exclude = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const companyId = req.params.companyId;
    const ingredientId = req.params.ingredientId;

    await deleteIngredient(companyId, ingredientId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
