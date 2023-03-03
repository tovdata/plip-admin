// Instance
import { authApi } from "@/apis/utilities/core";
// Utilites
import { catchRequestError } from "@/apis/utilities/error";
import { isEmptyObject } from "@/utilities/common";

/**
 * [API Caller] 서비스 조회
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