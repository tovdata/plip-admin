// Instance
import { authApi } from "@/apis/utilities/core";
// Utilites
import { catchRequestError } from "@/apis/utilities/error";
import { isEmptyObject, isEmptyString } from "@/utilities/common";

/**
 * [API Caller] 사용자 검색
 * @param keyword 키워드
 * @returns 검색 결과
 */
export async function findUsers(keyword?: string): Promise<any> {
  try {
    // API 호출
    const { data } = await authApi.get(isEmptyString(keyword) ? "/users?company_name=true" : `/users?keyword=${encodeURIComponent(keyword as string)}&company_name=true`);
    // 응답 처리
    return isEmptyObject(data) ? [] : data.sort((a: any, b: any): number => b.created_at - a.created_at);
  } catch (err: any) {
    catchRequestError(err);
    return null;
  }
}
/**
 * [API Caller] 회사 수 조회
 * @returns 조회 결과
 */
export async function getUserCount(): Promise<number> {
  try {
    // API 호출
    const { data } = await authApi.get("/users");
    // 응답 처리
    return isEmptyObject(data) ? 0 : data.length;
  } catch (err: any) {
    catchRequestError(err, false);
    return 0;
  }
}
/**
 * [API Caller] 사용자 조회
 * @param from 기준일
 * @returns 조회 결과
 */
export async function getUsers(from?: number): Promise<any[]> {
  try {
    // API 호출
    const { data } = await authApi.get(from ? `/users?from=${from}&company_name=true` : "/users?company_name=true");
    // 응답 처리
    return isEmptyObject(data) ? [] : data.sort((a: any, b: any): number => b.created_at - a.created_at);
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}
/**
 * [API Caller] 회사에 대한 사용자 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export async function getUsersByCompany(companyId: string): Promise<any[]> {
  try {
    // API 호출
    const { data } = await authApi.get(`/companies/${companyId}/users`);
    // 응답 처리
    return isEmptyObject(data) ? [] : data.sort((a: any, b: any): number => b.created_at - a.created_at);
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}