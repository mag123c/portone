import { NextFunction, Request, Response } from "express";
import logger from "../../utils/winston.logger";

interface ErrorResponse {
  status: number;
  message: string;
  time: string;
  stack?: string;
}

interface LogMessage extends ErrorResponse {
  url: string;
  method: string;
  ip: string | undefined;
}

export const GlobalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";

  console.error(error);

  let errorResponse: ErrorResponse = {
    status,
    message,
    time: new Date().toISOString(),
  };

  let logMsg: LogMessage = {
    ...errorResponse,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    stack: error.stack,
  };

  errorResponse.stack = error.stack;

  logger.error(`${error.message}(${status})`, logMsg);

  res.status(status).json(errorResponse);
};
