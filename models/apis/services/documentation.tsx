// Instance
import { authApi } from "@/apis/utilities/core";
// Utilites
import { catchRequestError } from "@/apis/utilities/error";
import { isEmptyObject } from "@/utilities/common";

/**
 * [API Caller] 동의서 목록 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export async function getConsents(serviceId: string): Promise<any[]> {
  try {
    // API 호출
    const { data } = await authApi.get(`/services/${serviceId}/consent?urls=true`);
    // 예외 처리
    if (isEmptyObject(data) || data.list === undefined) return [];
    // 응답 처리
    return data.list;
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}
/**
 * [API Caller] 내부 관리계획 목록 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export async function getIpps(companyId: string): Promise<any[]> {
  try {
    // API 호출
    const { data } = await authApi.get(`/companies/${companyId}/ipp?urls=true`);
    // 예외 처리
    if (isEmptyObject(data) || data.list === undefined) return [];
    // 응답 처리
    return data.list;
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}
/**
 * [API Caller] 개인정보 처리방침 목록 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export async function getPipps(serviceId: string): Promise<any[]> {
  try {
    // API 호출
    const { data } = await authApi.get(`/services/${serviceId}/pipp?urls=true`);
    // 예외 처리
    if (isEmptyObject(data) || data.list === undefined) return [];
    // 응답 처리
    console.log("data", data);
    return data.list;
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}