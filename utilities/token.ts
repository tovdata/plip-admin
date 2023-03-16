// Utilities
import dayjs from "dayjs";
import { decode } from "jsonwebtoken";
import { isEmptyString } from "@/utilities/common";

// 액세스 토큰에 대한 키(Key)
const KEY: string = "pa-auth";

/**
 * [Function] 액세스 토큰 복호화
 * @param token 토큰 값
 * @returns 복호화된 결과
 */
export function decodeAccessToken(token: string | null | undefined): any {
  try {
    // 토큰 값 존재 확인
    if (isEmptyString(token)) return undefined;
    // 복호화 및 반환
    return decode(token as string);
  } catch {
    console.error("[Utilities Error] Unable to decode access token");
    return undefined;
  }
}
/**
 * [Function] 액세스 토큰 조회
 * @returns 조회 결과
 */
export function getAccessToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
}
/**
 * [Function] 액세스 토큰 만료 여부
 * @param value 토큰 값 또는 만료일시(number)
 * @param isExp 첫 번째 인자가 만료일시(number)인지 확인하는 인자
 * @returns 만료 여부
 */
export function isAccessTokenExpired(value: any, isExp?: boolean): boolean {
  try {
    // 첫 번째 인자가 만료일시(number)인 경우
    if (isExp) {
      return !(value && dayjs().isBefore(dayjs.unix(value)));
    } else {  // 토큰 값인 경우
      // 토큰 값 존재 확인
      if (isEmptyString(value)) {
        // 세션에서 제거
        if (typeof window !== "undefined") localStorage.removeItem(KEY);
        // 결과 반환
        return true;
      }
      // 토큰 복호화
      const decoded: any = decode(value as string);
      // 만료 검증
      return !(decoded.exp && dayjs().isBefore(dayjs.unix(decoded.exp)));
    }
  } catch {
    console.error("[Utilities Error] Unable to determine access token expiration.");
    return true;
  }
}
/**
 * [Function] 액세스 토큰 설정
 * @param token 토큰 값
 */
export function setAccessToken(token: string | null | undefined): void {
  try {
    // Window 객체가 없을 경우, 종료
    if (typeof window === "undefined") return;
    // 토큰 값이 없을 경우, 세션에서 제거
    if (isEmptyString(token)) localStorage.removeItem(KEY);
    // 토큰 값 설정
    else localStorage.setItem(KEY, token as string);
  } catch {
    console.error("[Utilities Error] Unable to set access token.");
  }
}