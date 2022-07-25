import { api } from '@/models/apis/core';

/**
 * [API Caller] 뉴스 생성
 * @returns 요청 결과
 */
export const createNews = async (data: any): Promise<boolean> => {
  try {
    // 데이터에서 ID 제거
    delete data.id;
    // API 호출
    const response: any = await api.post('/article/new', data);
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 뉴스 생성
 * @param newsId 뉴스 ID
 * @returns 요청 결과
 */
export const deleteNews = async (newsId: string): Promise<boolean> => {
  try {
    // API 호출
    const response: any = await api.delete(`/article/${newsId}`);
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 뉴스 목록 조회
 * @returns 조회 결과
 */
 export const getNews = async (): Promise<any[]> => {
  try {
    // API 호출
    const response: any = await api.get('/article/all');
    // 데이터 가공 및 결과 반환
    return response.result && response.data ? response.data.sort((a: any, b: any): number => b.regAt - a.regAt).map((item: any): any => ({ ...item, key: item.id })) : [];
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 뉴스 갱신
 * @param newsId 뉴스 ID
 * @returns 요청 결과
 */
 export const updateNews = async (newsId: string, data: any): Promise<boolean> => {
  try {
    // 데이터에서 ID 제거
    delete data.id;
    // API 호출
    const response: any = await api.put(`/article/${newsId}`, data);
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}