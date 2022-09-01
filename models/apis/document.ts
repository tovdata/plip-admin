import { api } from '@/models/apis/core';
import { ResponseDF } from '@/models/type';

/**
 * [API Caller] 자료 생성
 * @returns 요청 결과
 */
export const createDocument = async (data: any): Promise<boolean> => {
  try {
    // API 호출
    const response: any = await api.post('/template/new', data);
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 자료 삭제
 * @param documentId 자료 ID
 * @returns 요청 결과
 */
export const deleteDocument = async (documentId: string): Promise<boolean> => {
  try {
    // API 호출
    const response: any = await api.delete(`/template/${documentId}`);
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 자료 목록 조회
 * @returns 조회 결과
 */
 export const getDocuments = async (): Promise<any[]> => {
  try {
    // API 호출
    const response: any = await api.get('/template/all');
    // 데이터 가공 및 결과 반환
    return response.result && response.data ? response.data.sort((a: any, b: any): number => b.publishAt - a.publishAt).map((item: any): any => ({ ...item, key: item.id })) : [];
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 자료 수정
 * @param documentId 자료 ID
 * @returns 요청 결과
 */
 export const updateDocument = async (documentId: string, data: any): Promise<ResponseDF> => {
  try {
    // API 호출 및 반환
    return await api.patch(`/template/${documentId}`, data);
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}