export class BaseException extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export class ValidationPipeException extends BaseException {
  constructor(
    public errorType: string,
    public errorMessage: string,
    statusCode: number = 400
  ) {
    super(errorMessage, statusCode);
  }
}
