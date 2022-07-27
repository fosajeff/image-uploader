import { NextFunction, Request, Response } from "express";
import HttpException from "./http.exception";

const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  res.status(status).send({ status: false, message });
};

export default errorMiddleware;
