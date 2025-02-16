export enum ErrorType {
  EMPTY_BODY = "EMPTY_BODY",
  VALIDATION_FAILED = "VALIDATION_FAILED",
}

export enum ValidationPipeErrorMessage {
  EMPTY_BODY = "요청 본문이 없습니다.",
  MISSMATCH_TYPE_ARRAY = "객체가 배열이 아닙니다.",
  INVALID_ID = "유효하지 않은 ID 형식입니다.",
  EMPTY_QUERY = "요청 필수 쿼리가 없습니다.",
}
