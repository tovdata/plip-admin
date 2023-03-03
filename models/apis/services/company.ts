// Instance
import { authApi } from "@/apis/utilities/core";
// Utilites
import { catchRequestError } from "@/apis/utilities/error";
import { isEmptyObject } from "@/utilities/common";

/**
 * [API Caller] 회사 조회
 * @param isSimple 간편 조회 여부 (이름과 ID)
 * @returns 조회 결과
 */
export async function getCompanies(isSimple?: boolean): Promise<any[]> {
  try {
    // API 호출
    const { data } = await authApi.get("/companies");
    // 예외 처리
    if (isEmptyObject(data)) return [];
    // 데이터 처리 및 반환
    return isSimple ? data.map((item: any): any => ({ id: item.id, name: item.name })) : data;
  } catch (err: any) {
    catchRequestError(err, false);
    return [];
  }
}