import { NextFunction, Request, Response } from "express";

const AsyncHandler = (fn: Function) => {
  return function (req: Request, res: Response, next: NextFunction) {
    Promise.resolve(fn(req, res)).catch(next);
  };
};

export default AsyncHandler;
