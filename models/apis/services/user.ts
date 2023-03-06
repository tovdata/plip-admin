// Instance
import { authApi } from "@/apis/utilities/core";
// Utilites
import { catchRequestError } from "@/apis/utilities/error";
import { isEmptyObject } from "@/utilities/common";

/**
 * [API Caller] 사용자 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export async function getUsers(companyId: string): Promise<any[]> {
  try {
    // API 호출
    const { data } = await authApi.get(`/companies/${companyId}/users`);
    // 응답 처리
    return isEmptyObject(data) ? [] : data;
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}