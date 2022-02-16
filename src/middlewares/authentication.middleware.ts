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
  };

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, decoded: any) => {
      if (err) {
        return res
          .status(401)
          .json({ status: "error", message: "Invalid token" });
      };

      const idLogged = decoded.idLogged;

      req.idLogged = idLogged;

      next();
    }
  );
};

export const authenticateApiKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ status: "error", message: "missing authorization headers" });
  };

  const createdBy = req.headers.authorization.split(" ")[1];

  const apiKey = process.env.API_KEYS?.split(",").some(
    (key) => key === createdBy
  );

  if (!apiKey) {
    return next(new ErrorHandler("Invalid API key", 401));
  };

  req.idLogged = createdBy;

  next();
};

export const authenticateApiKeyOrToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res
      .status(401)
      .json({ status: "error", message: "missing authorization headers" });
  };
  
  const tokenOrApiKey = req.headers.authorization.split(" ")[1];

  const isApiKey = process.env.API_KEYS?.split(",").some(
    (key) => key === tokenOrApiKey
  );

  if (isApiKey) {
    req.idLogged = tokenOrApiKey;

  } else {
    jwt.verify(
      tokenOrApiKey,
      process.env.JWT_SECRET as string,
      async (err: any, decoded: any) => {
        if (err) {
          return res
            .status(401)
            .json({ status: "error", message: "invalid token" });
        };

        const idLogged = decoded.idLogged;

        req.idLogged = idLogged;
      }
    );
  };

  next();
};
