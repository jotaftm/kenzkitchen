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
    const idLogged = req.idLogged;
    const user = await createUser(idLogged, req.body);

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
    const idLogged = req.idLogged;
    const companyId = req.params.companyId;

    const usersList = await listUsers(idLogged, companyId);

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
    const companyId = req.params.companyId;
    const userId = req.params.userId;

    const user = await findUser(idLogged, companyId, userId);

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
    const companyId = req.params.companyId;
    const body = req.body;
    const updatedId = req.params.userId;

    const userUpdated = await updateUser(idLogged, companyId, body, updatedId);

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
    const companyId = req.params.companyId;
    const deletedId = req.params.userId;

    await deleteUser(idLogged, companyId, deletedId);

    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
