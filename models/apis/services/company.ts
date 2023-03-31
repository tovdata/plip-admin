// Data type
import type { SearchOption } from "@/types";
// Instance
import { authApi } from "@/apis/utilities/core";
// Utilites
import { catchRequestError } from "@/apis/utilities/error";
import { findApiUrl } from "@/apis/utilities/process";
import { isEmptyObject } from "@/utilities/common";

/**
 * [API Caller] 회사 검색
 * @param option 검색 옵션
 * @returns 검색 결과
 */
export async function findCompanies(option?: SearchOption): Promise<any[]> {
  try {
    // 예외 처리 (검색 키워드가 없을 경우)
    if (isEmptyObject(option)) return [];
    // 검색 옵션에 따른 URL
    const url: string = findApiUrl("/companies", option as SearchOption);
    // API 호출
    const { data } = await authApi.get(url);
    // 예외 처리
    if (isEmptyObject(data)) return [];
    // 데이터 가공 및 반환
    return data.sort((a: any, b: any): number => b.created_at - a.created_at);
  } catch (err: any) {
    await catchRequestError(err);  // useQuery에서 Promise를 await하면 ErrorBoundary에서 잡지 못하여 fetching 함수에서 await 합니다
    return [];
  }
}
/**
 * [API Caller] 회사 목록 조회 (Batch)
 * @param size Batch size
 * @param offset Offset index
 * @returns 조회 결과
 */
export async function getBatchCompanies(size: number = 20, offset?: number) {
  try {
    // API 호출
    const { data } = await authApi.get(offset ? `/companies?offset=${offset}&limit=${offset}&with_counts=true` : `/companies?offset=0&limit=${size}&with_counts=true`);
    // 예외 처리
    if (isEmptyObject(data)) return [];
    // 데이터 가공 및 반환
    return data.sort((a: any, b: any): number => b.created_at - a.created_at);
  } catch (err: any) {
    await catchRequestError(err);
    return [];
  }
}
/**
 * [API Caller] 회사 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export async function getCompany(companyId: string): Promise<any> {
  try {
    // API 호출
    const { data } = await authApi.get(`/companies/${companyId}`);
    // 응답 처리
    return isEmptyObject(data) ? null : data;
  } catch (err: any) {
    await catchRequestError(err);
    return null;
  }
}
/**
 * [API Caller] 회사 수 조회
 * @returns 조회 결과
 */
export async function getCompanyCount(): Promise<number> {
  try {
    // API 호출
    const { data } = await authApi.get("/companies");
    // 응답 처리
    return isEmptyObject(data) ? 0 : data.length;
  } catch (err: any) {
    await catchRequestError(err);
    return 0;
  }
}
/**
 * [API Caller] 회사 이름 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export async function getCompanyName(companyId: string): Promise<string> {
  try {
    // API 호출
    const { data } = await authApi.get(`/companies/${companyId}`);
    // 응답 처리
    return isEmptyObject(data) ? null : data.name ?? "";
  } catch (err: any) {
    await catchRequestError(err);
    return "";
  }
}
/**
 * [API Caller] 개인정보 보호책임자 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export async function getManager(companyId: string): Promise<any> {
  try {
    // API 호출
    const { data } = await authApi.get(`/companies/${companyId}`);
    // 응답 처리
    return isEmptyObject(data) ? null : { name: data.m_name, email: data.m_email, position: data.m_position };
  } catch (err: any) {
    await catchRequestError(err);
    return null;
  }
}