import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ValidationPipeException } from "../exception/custom-exception";
import {
  ErrorType,
  ValidationPipeErrorMessage,
} from "../exception/enum/exception.enum";

export const ValidateRequestBodyPipe = <T extends object>(
  type: new () => T
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instance: T = plainToInstance(type, req.body, {
        excludeExtraneousValues: true,
      });

      // 빈 객체이거나 모든 필드가 undefined인지 체크
      const hasValidFields =
        Object.keys(instance).length > 0 &&
        Object.values(instance).some((value) => value !== undefined);

      if (!hasValidFields) {
        throw new ValidationPipeException(
          ErrorType.EMPTY_BODY,
          ValidationPipeErrorMessage.EMPTY_BODY
        );
      }

      // 유효성 검사 에러 처리
      const errors: ValidationError[] = await validate(instance, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        const errorMessages = errors
          .flatMap((err) =>
            err.constraints ? Object.values(err.constraints) : []
          )
          .join("\n");

        throw new ValidationPipeException(
          ErrorType.VALIDATION_FAILED,
          errorMessages
        );
      }

      req.body = instance;
      next();
    } catch (e: any) {
      next(e);
    }
  };
};
