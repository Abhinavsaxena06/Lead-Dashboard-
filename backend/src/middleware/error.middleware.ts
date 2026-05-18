import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error & { statusCode?: number },
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error"
  });
};