import { ErrorHandler } from "./../errors/errorHandler.error";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ status: "error", message: "missing authorization headers" });
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) {
        return res
          .status(401)
          .json({ status: "error", message: "Invalid token" });
      }
      // Depois, definir qual será o req.user a partir do decoded vindo do login

      next();
    }
  );
};

export const authenticateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { createdBy } = req.body;
  console.log(process.env.API_KEYS?.split(","));

  const apiKey = process.env.API_KEYS?.split(",").some(
    (key) => key === createdBy
  );

  if (!apiKey) {
    return next(new ErrorHandler("Invalid API key", 401));
  }

  return next();
};
