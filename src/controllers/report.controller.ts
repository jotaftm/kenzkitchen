import { Request, Response, NextFunction } from "express";
import { createReport } from "../services/report.service";

export const download = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.orderId;

    await createReport(orderId);

    // res.type("pdf");
    // res.download("./uploads/report.pdf");
    res.json({ message: "oi" });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
