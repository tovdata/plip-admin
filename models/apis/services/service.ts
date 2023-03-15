// Data type
import type { SearchOption } from "@/types";
// Instance
import { authApi } from "@/apis/utilities/core";
// Utilites
import { catchRequestError } from "@/apis/utilities/error";
import { findApiUrl } from "@/apis/utilities/process";
import { isEmptyObject } from "@/utilities/common";

/**
 * [API Caller] 서비스 검색
 * @param option 검색 옵션
 * @returns 검색 결과
 */
export async function findServices(option?: SearchOption): Promise<any[]> {
  try {
    // 예외 처리 (검색 키워드가 없을 경우)
    if (isEmptyObject(option)) return [];
    // 검색 옵션에 따른 URL
    const url: string = findApiUrl("/services", option as SearchOption);
    // API 호출
    const { data } = await authApi.get(`${url}&company_name=true`);
    // 응답 처리
    return isEmptyObject(data) ? [] : data.sort((a: any, b: any): number => b.create_at - a.create_at);
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}
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
 * [API Caller] 개인정보 수집 항목 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export async function getPiItems(serviceId: string): Promise<any> {
  try {
    // 항목에 대한 데이터 형식
    const items: any = { essentials: [], selections: [] };
    // API 호출
    const { data } = await authApi.get(`/services/${serviceId}/pis/`);
    // 응답 처리
    if (isEmptyObject(data)) {
      return items;
    } else {
      for (const key of Object.keys(data)) {
        // 행(Row) 데이터
        const row: any = data[key];
        // 업무명이 없을 경우, 제외
        if (row.subject === undefined) continue;
        // 항목 추출
        if (row.essentialItems) items.essentials.push(...row.essentialItems.filter((item: string): boolean => !items.essentials.includes(item)));
        if (row.selectionItems) items.selections.push(...row.selectionItems.filter((item: string): boolean => !items.selections.includes(item)));
      }
      // 반환
      return items;
    }
  } catch (err: any) {
    catchRequestError(err);
    return { essentials: [], selections: [] };
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
    return isEmptyObject(data) ? [] : Object.keys(data).map((key: string, index: number): any => ({ index, ...data[key] }));
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
    const { data } = await authApi.get(`/services/${serviceId}?company_name=true`);
    // 응답 처리
    return isEmptyObject(data) ? null : data;
  } catch (err: any) {
    catchRequestError(err);
    return null;
  }
}
/**
 * [API Caller] 서비스 수 조회
 * @returns 조회 결과
 */
export async function getServiceCount(): Promise<number> {
  try {
    // API 호출
    const { data } = await authApi.get("/services");
    // 응답 처리
    return isEmptyObject(data) ? 0 : data.length;
  } catch (err: any) {
    catchRequestError(err, false);
    return 0;
  }
}
/**
 * [API Caller] 서비스 목록 조회
 * @param from 기준일
 * @returns 조회 결과
 */
export async function getServices(from?: number): Promise<any[]> {
  try {
    // API 호출
    const { data } = await authApi.get(from ? `/services?from=${from}&company_name=true` : "/services?company_name=true");
    // 응답 처리
    return isEmptyObject(data) ? [] : data.sort((a: any, b: any): number => b.create_at - a.create_at);
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}
/**
 * [API Caller] 서비스 목록 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export async function getServicesByCompany(companyId?: string): Promise<any[]> {
  try {
    // API 호출
    const { data } = await authApi.get(`/companies/${companyId}/services`);
    // 응답 처리
    return isEmptyObject(data) ? [] : data.sort((a: any, b: any): number => b.create_at - a.create_at);
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}