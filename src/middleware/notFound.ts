import { NextFunction, Request, Response } from "express";
import { createAppError } from "../types";

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  next(createAppError(404, "NOT_FOUND", `Route ${req.method} ${req.path} not found`));
}
