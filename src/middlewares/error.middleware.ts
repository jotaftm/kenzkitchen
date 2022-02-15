import { ErrorHandler } from "./../errors/errorHandler.error";
import { Request, Response, NextFunction } from "express";

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    return res
      .status(err.statusCode)
      .json({ status: "error", message: err.message });
  }
};
