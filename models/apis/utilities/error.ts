import { AxiosError } from "axios";

// 에러 유형
export const ERROR_CODE: any = {
  400: "BAD_REQUEST",                 // API에 대한 파라미터 오류
  401: "UNAUTHORIZED",                // 토큰에 대한 인증 실패 (리프레시 토큰 만료 포함)
  403: "FORBIDDEN",                   // 권한에 따른 거부
  404: "NOT_FOUND",                   // API가 존재하지 않음
  408: "TIMEOUT",                     // Timeout
  500: "INTERNAL_SERVER_ERROR",       // 내부적인 서버 오류
  999: "ERROR"                        // 기본 오류 (프론트에서만 사용)
};

/**
 * [Function] API 요청 오류 표시 함수
 * @param err 응답 에러 객체
 * @returns 오류 응답
 */
export const catchRequestError = (apiErr: AxiosError, isCatch: boolean = true): Promise<any> => {
  // 에러 객체 생성
  const err: Error = new Error(apiErr?.message);
  // 에러 이름 설정
  err.name = apiErr.name;
  // 에러 반환
  return isCatch ? Promise.reject(err) : Promise.resolve();
}
/**
 * [Function] 에러 객체 생성
 * @param message 에러 메시지
 * @param type 에러 유형
 * @param request 요청 객체
 * @returns 에러 객체
 */
export const createResponseError = (message: string, code: number = 999, request?: any): AxiosError => {
  // 에러 객체 생성
  let error: AxiosError = new AxiosError(message);
  // 속성 설정
  error.name = ERROR_CODE[code];
  error.status = code;
  // 요청 객체가 존재할 경우,
  if (request) error.config = request;
  // 반환
  return error;
}