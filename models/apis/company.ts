import { api } from './core';

/**
 * [API Caller] 회사 정보 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export const getCompany = async (companyId: string): Promise<any> => {
  try {
    // API 호출
    const response: any = await api.get(`/company/${companyId}`);
    // 데이터 가공 및 결과 반환
    return response.result && response.data ? response.data : undefined;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return undefined;
  }
}
/**
 * [API Caller] 회사 목록 조회
 * @returns 조회 결과
 */
export const getCompanies = async (): Promise<any[]> => {
  try {
    // API 호출
    const response: any = await api.get('/company/list');
    // 데이터 가공 및 결과 반환
    if (response.result && response.data && response.data.list) {
      return response.data.list.sort((a: any, b: any): number => b.createAt - a.createAt).map((item: any): any => ({ ...item, key: item.id }));
    } else {
      return [];
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 회사 목록 조회
 * @returns 조회 결과
 */
export const getManager = async (companyId: string): Promise<any> => {
  try {
    // API 호출
    const response: any = await api.get(`/company/${companyId}`);
    // 결과 반환
    return response.result && response.data && response.data.manager ? response.data.manager : undefined;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return undefined;
  }
}
/**
 * [API Caller] 사용자 목록 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export const getUsers = async (companyId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: any = await api.get(`/company/${companyId}/details`);
    // 데이터 가공 및 결과 반환
    if (response.result && response.data && response.data.employees) {
      return response.data.employees.sort((a: any, b: any): number => b.createAt - a.createAt).map((item: any): any => ({
        contact: item.contact,
        createAt: item.createAt,
        email: item.email,
        id: item.id,
        key: item.id,
        marketing: item.agreement?.ssa1,
        userName: item.userName,
      }));
    } else {
      return [];
    }
    return [];
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}