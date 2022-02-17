import { NextFunction, Request, Response } from "express";
import {
  createRecipe,
  deleteRecipe,
  findRecipe,
  listRecipe,
  updateRecipe,
} from "../services/recipe.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(201).json();
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
    res.json();
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
    res.json();
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
