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
