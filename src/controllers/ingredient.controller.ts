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
    const newIngredient = await createIngredient(req.idLogged, req.body);

    res.status(201).json(newIngredient);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ingredientsList = await listIngredients();

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
    const searchedId = req.params.id;

    const ingredient = await findIngredient(searchedId);

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
    const body = req.body;
    const updatedId = req.params.id;

    const ingredientUpdated = await updateIngredient(body, updatedId);

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
    const deletedId = req.params.id;

    await deleteIngredient(deletedId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
