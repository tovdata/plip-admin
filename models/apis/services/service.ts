// Instance
import { authApi } from "@/apis/utilities/core";
// Utilites
import { catchRequestError } from "@/apis/utilities/error";
import { isEmptyObject } from "@/utilities/common";

/**
 * [API Caller] 최근 정보 수정일 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export async function getLastModified(serviceId: string): Promise<any> {
  try {
    // API 호출
    const { data } = await authApi.get(`/services/${serviceId}/modifiedtime`);
    // 응답 처리
    return isEmptyObject(data) ? null : data;
  } catch (err: any) {
    catchRequestError(err, false);
    return null;
  }
}
/**
 * [API Caller] 개인정보 관리(PIM) 데이터 조회
 * @param serviceId 서비스 ID
 * @param type 데이터 유형 [cfni | cpi | dpi | fni | pfni | pi | ppi]
 * @param isLink 링크 데이터 조회 여부
 * @returns 조회 결과
 */
export async function getPimItems(serviceId: string, type: "cfni" | "cpi" | "dpi" | "fni" | "pfni" | "pi" | "ppi", isLink?: boolean): Promise<any[]> {
  try {
    // API 쿼리 파라미터
    const queryParams: string = isLink ? "?urls=true" : "";
    // API 호출
    const { data } = await authApi.get(`/services/${serviceId}/${type}s${queryParams}`);
    // 응답 처리
    return isEmptyObject(data) ? [] : Object.keys(data).map((key: string): any => data[key]);
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}
/**
 * [API Caller] 서비스 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export async function getService(serviceId: string): Promise<any> {
  try {
    // API 호출
    const { data } = await authApi.get(`/services/${serviceId}`);
    // 응답 처리
    return isEmptyObject(data) ? null : data;
  } catch (err: any) {
    catchRequestError(err);
    return null;
  }
}
/**
 * [API Caller] 서비스 목록 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export async function getServices(companyId: string): Promise<any[]> {
  try {
    // API 호출
    const { data } = await authApi.get(`/companies/${companyId}/services`);
    // 응답 처리
    return isEmptyObject(data) ? [] : data;
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}