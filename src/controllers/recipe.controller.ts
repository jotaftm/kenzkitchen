import { NextFunction, Request, Response } from "express";
import {
  createRecipe,
  deleteRecipe,
  findRecipe,
  listRecipes,
  updateRecipe,
} from "../services/recipe.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idLogged = req.idLogged;

    const body = req.body;

    const newRecipe = await createRecipe(idLogged, body);

    res.status(201).json(newRecipe);
  } catch (err) {
    next(err);
  }
};

export const listAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idLogged = req.idLogged;

    const recipes = await listRecipes(idLogged);

    res.json(recipes);
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
    res.json();
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
    const idLogged = req.idLogged;

    const body = req.body;

    const recipeId = req.params.id;

    const updatedRecipe = await updateRecipe(idLogged, body, recipeId);

    res.json(updatedRecipe);
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
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
