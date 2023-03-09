// Instance
import { authApi } from "@/apis/utilities/core";
// Utilites
import { catchRequestError } from "@/apis/utilities/error";
import { isEmptyObject, isEmptyString } from "@/utilities/common";

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
    return data.list.sort((a: any, b: any): number => b.published_at - a.published_at);
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
    if (isEmptyObject(data)) return [];

    // 응답 처리
    const list: any[] = [];
    // 이전 내부 관리계획
    if (data.ipp_history) list.push(...data.ipp_history);
    // 목록 추가
    if (data.ipp_list && data.ipp_list.list) list.push(...data.ipp_list.list)
    // 가공 데이터 반환
    return list.sort((a: any, b: any): number => b.enforced_at - a.enforced_at).map((item: any, index: number): any => ({ ...item, index }));
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
    const list: any[] = [];
    // 이전 처리방침 확인
    if (data.prev_published_at && !isEmptyString(data.prev_url)) list.push({ index: 0, published_at: data.prev_published_at, url: data.prev_url });
    // 목록 추가
    if (data.list) list.push(...data.list.sort((a: any, b: any): number => a.created_at - b.create_at).map((item: any, index: number): any => ({ ...item, index: index + 1 })));
    // 가공 데이터 반환
    return list.sort((a: any, b: any): number => b.published_at - a.published_at);
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}