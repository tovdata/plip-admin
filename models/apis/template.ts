import { api } from '@/models/apis/core';

/**
 * [API Caller] 템플릿 생성
 * @returns 요청 결과
 */
export const createTemplate = async (data: any): Promise<boolean> => {
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
 * [API Caller] 템플릿 생성
 * @param templateId 템플릿 ID
 * @returns 요청 결과
 */
export const deleteTemplate = async (templateId: string): Promise<boolean> => {
  try {
    // API 호출
    const response: any = await api.delete(`/template/${templateId}`);
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 템플릿 목록 조회
 * @returns 조회 결과
 */
 export const getTemplates = async (): Promise<any[]> => {
  try {
    // API 호출
    const response: any = await api.get('/template/all');
    // 데이터 가공 및 결과 반환
    return response.result && response.data ? response.data.sort((a: any, b: any): number => b.regAt - a.regAt).map((item: any): any => ({ ...item, key: item.id })) : [];
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 템플릿 갱신
 * @param templateId 템플릿 ID
 * @returns 요청 결과
 */
 export const updateTemplate = async (templateId: string, data: any): Promise<boolean> => {
  try {
    // API 호출
    const response: any = await api.put(`/template/${templateId}`, data);
    console.log(response);
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}