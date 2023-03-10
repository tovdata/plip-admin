// Instance
import { authApi } from "@/apis/utilities/core";
// Utilites
import { catchRequestError } from "@/apis/utilities/error";
import { isEmptyObject } from "@/utilities/common";

/**
 * [API Caller] 사용자 검색
 * @param name 사용자 이름
 * @returns 검색 결과
 */
export async function findUser(name: string): Promise<any> {
  try {
    // API 호출
    const { data } = await authApi.get(`/users?keyword=${name}`);
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
 * @returns 조회 결과
 */
export async function getUsers(): Promise<any[]> {
  try {
    // API 호출
    const { data } = await authApi.get("/users?company_name=true");
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