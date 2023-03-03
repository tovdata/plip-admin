/**
 * [Function] 빈 객체 확인
 * @param obj 객체
 * @returns 확인 결과
 */
export const isEmptyObject = (obj: any): boolean => {
  try {
    return Object.keys(obj).length === 0 ? true : obj.type === "NOT_FOUND" ? true : false;
  } catch {
    console.error("[Utilities Error] isEmptyObject function error.");
    return true;
  }
}
/**
 * [Function] 빈 값 확인
 * @param value 값 (문자열)
 * @returns 확인 결과
 */
export function isEmptyValue(value: string | null | undefined): boolean {
  try {
    return value ? value.replace(/^\s+|\s$/g, "") === "" : true;
  } catch {
    console.error("[Utilities Error] isEmptyValue function error.");
    return true;
  }
}