export interface AppError extends Error {
  status: number;
  code: string;
  publicMessage: string;
}

export function createAppError(status: number, code: string, publicMessage: string): AppError {
  const error = new Error(publicMessage) as AppError;
  error.status = status;
  error.code = code;
  error.publicMessage = publicMessage;
  return error;
}
