import { NextFunction, Request, Response } from "express";
import logger from "../../utils/winston.logger";

export const LoggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startHrTime = process.hrtime();

  res.on("finish", () => {
    const elapsedHrTime = process.hrtime(startHrTime);
    const elapsedTimeInMs = (
      elapsedHrTime[0] * 1000 +
      elapsedHrTime[1] / 1e6
    ).toFixed(3);

    logger.info(
      `${req.method} ${req.url} ${res.statusCode} - ${elapsedTimeInMs}ms`
    );
  });

  next();
};
