import dayjs from "dayjs";

/**
 * [Function] 숫자 확인 (0 또는 null 또는 undefined 여부)
 * @param obj 숫자 값
 * @returns 확인 결과
 */
export const isEmptyNumber = (value: number | null | undefined): boolean => {
  try {
    return value === undefined || value === null || value === 0;
  } catch {
    console.error("[Utilities Error] isEmptyObject function error.");
    return true;
  }
}
/**
 * [Function] 빈 객체 확인
 * @param obj 객체
 * @returns 확인 결과
 */
export const isEmptyObject = (obj: any): boolean => {
  try {
    return obj ? Object.keys(obj).length === 0 ? true : obj.type === "NOT_FOUND" ? true : false : true;
  } catch {
    console.error("[Utilities Error] isEmptyObject function error.");
    return true;
  }
}
/**
 * [Function] 빈 문자열 확인
 * @param value 값 (문자열)
 * @returns 확인 결과
 */
export function isEmptyString(value: string | null | undefined): boolean {
  try {
    return value ? value.replace(/^\s+|\s$/g, "") === "" : true;
  } catch {
    console.error("[Utilities Error] isEmptyString function error.");
    return true;
  }
}
/**
 * [Function] 마지막 로그인 시간 확인
 * @param timestamp 유닉스 타임스탬프
 * @returns 마지막 로그인 (현재 시간과 비교)
 */
export function lastSignin(timestamp?: number) {
  try {
    // 숫자 값 확인
    if (isEmptyNumber(timestamp)) return "";
    // 현재 시간과 비교
    const diff: number = dayjs().diff(dayjs.unix(timestamp as number), "h");
    // 가공 및 반환
    return diff >= 24 ? `${Math.floor(diff / 24)}일 전` : diff === 0 ? "1시간 이내" : `${diff}시간 전`;
  } catch {
    console.error("[Utilities Error] lastSignin function error.");
    return "";
  }
}
/**
 * [Function] 날짜 변환 (YYYY-MM-DD)
 * @param timestamp 유닉스 타임스탬프
 * @returns 변환된 날짜 (문자열)
 */
export function transformToDate(timestamp?: number): string {
  try {
    // 예외 처리
    if (isEmptyNumber(timestamp)) return "";
    // 유닉스 타임스탬프 변환 (miliscend 단위)
    const value: number = (timestamp as number) > 1_000_000_000_000 ? (timestamp as number) / 1000 : (timestamp as number);
    // 변환 및 반환
    return dayjs.unix(value).format("YYYY-MM-DD");
  } catch {
    console.error("[Utilities Error] tranformToDate function error.");
    return "";
  }
}
/**
 * [Function] 날짜 변환 (YYYY-MM-DD HH:mm)
 * @param timestamp 유닉스 타임스탬프
 * @returns 변환된 날짜 (문자열)
 */
export function transformToDateTime(timestamp?: number): string {
  try {
    // 예외 처리
    if (isEmptyNumber(timestamp)) return "";
    // 유닉스 타임스탬프 변환 (miliscend 단위)
    const value: number = (timestamp as number) > 1_000_000_000_000 ? (timestamp as number) / 1000 : (timestamp as number);
    // 변환 및 반환
    return dayjs.unix(value).format("YYYY-MM-DD HH:mm");
  } catch {
    console.error("[Utilities Error] tranformToDate function error.");
    return "";
  }
}