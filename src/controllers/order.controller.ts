import { listOrdersByDate } from "./../services/order.service";
import { Request, Response, NextFunction } from "express";
import {
  createOrder,
  listOrders,
  findOrder,
  updateOrder,
  deleteOrder,
} from "../services/order.service";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idLogged = req.idLogged;
    const body = req.body;

    const order = await createOrder(idLogged, body);

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const idLogged = req.idLogged;
  const { scheduled } = req.query;
  console.log(req.params);

  if (scheduled) {
    try {
      const ordersListByDate = await listOrdersByDate(
        idLogged,
        scheduled as string
      );

      return res.json(ordersListByDate);
    } catch (err) {
      next(err);
    }
  }

  try {
    const ordersList = await listOrders(idLogged);

    res.json(ordersList);
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
    const orderId = req.params.orderId;

    const order = await findOrder(idLogged, orderId);

    res.json(order);
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
    const orderId = req.params.orderId;
    const body = req.body;

    const orderUpdated = await updateOrder(idLogged, orderId, body);

    res.json(orderUpdated);
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
    const orderId = req.params.orderId;

    await deleteOrder(idLogged, orderId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
