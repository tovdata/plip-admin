// Instance
import { authApi } from "@/apis/utilities/core";
// Utilites
import { catchRequestError } from "@/apis/utilities/error";
import { isEmptyObject } from "@/utilities/common";

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
    // 데이터 처리 및 반환
    return data.sort((a: any, b: any): number => b.created_at - a.created_at);
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}
/**
 * [API Caller] 회사 목록 조회
 * @param from 기준일
 * @returns 조회 결과
 */
export async function getCompanies(from?: number): Promise<any[]> {
  try {
    // API 호출
    const { data } = await authApi.get(from ? `/companies?from=${from}&with_counts=true` : `/companies?with_counts=true`);
    // 예외 처리
    if (isEmptyObject(data)) return [];
    // 데이터 처리 및 반환
    return data.sort((a: any, b: any): number => b.created_at - a.created_at);
  } catch (err: any) {
    catchRequestError(err, false);
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
    catchRequestError(err);
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
    catchRequestError(err, false);
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
    catchRequestError(err);
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
    catchRequestError(err, false);
    return null;
  }
}