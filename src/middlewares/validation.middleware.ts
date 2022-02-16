import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: yup.AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
      req.body = await schema.validate(body, { abortEarly: false });
      next();
    } catch (e) {
      return res
        .status(422)
        .json({ status: "error", message: (e as any).errors });
    }
  };
