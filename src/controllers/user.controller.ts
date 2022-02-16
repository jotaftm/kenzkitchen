import { Request, Response, NextFunction } from "express";
import {
  createUser,
  loginUser,
  listUsers,
  findUser,
  updateUser,
  deleteUser,
} from "../services/user.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await loginUser(req.body);

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const usersList = await listUsers();

    res.json(usersList);
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
    const idLogged = req.idLogged;

    const searchedId = req.params.id;

    const user = await findUser(idLogged, searchedId);

    res.json(user);
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

    const updatedId = req.params.id;

    const userUpdated = await updateUser(idLogged, body, updatedId);

    res.json(userUpdated);
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
    const idLogged = req.idLogged;

    const deletedId = req.params.id;

    await deleteUser(idLogged, deletedId);

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
