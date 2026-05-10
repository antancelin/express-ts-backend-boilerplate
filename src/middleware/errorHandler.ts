import { ErrorRequestHandler } from "express";
import { AppError } from "../types";

const isAppError = (err: unknown): err is AppError =>
  err instanceof Error && "status" in err && "code" in err && "publicMessage" in err;

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (isAppError(err)) {
    const body: Record<string, unknown> = {
      code: err.code,
      message: err.publicMessage,
    };
    if (process.env.NODE_ENV !== "production") {
      body.stack = err.stack;
    }
    res.status(err.status).json(body);
    return;
  }

  const body: Record<string, unknown> = {
    code: "INTERNAL_ERROR",
    message: "An unexpected error occurred",
  };
  if (process.env.NODE_ENV !== "production" && err instanceof Error) {
    body.stack = err.stack;
    body.details = err.message;
  }
  res.status(500).json(body);
};
