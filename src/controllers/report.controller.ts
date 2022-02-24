import { Request, Response, NextFunction } from "express";
import { generateReport } from "../services/report.service";

export const generate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const idLogged = req.idLogged;
    const orderId = req.params.orderId;

    await generateReport(idLogged, orderId, res);
  } catch (err) {
    next(err);
  }
};
