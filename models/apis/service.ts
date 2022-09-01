import { api } from '@/models/apis/core';

/**
 * [API Caller] 동의서 목록 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getConsents = async (serviceId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: any = await api.get(`/consent/${serviceId}`);
    // 데이터 가공
    if (response.result && response.data && response.data.consentList) {
      // 가공
      const list: any[] = response.data.consentList.map((item: any): any => ({
        publishedAt: item.publishedAt,
        title: item.data.title,
        type: consentType(item.data.type),
        url: item.url
      }));
      // 정렬
      return list.sort((a: any, b: any): number => b.publishedAt - a.publishedAt);
    } else {
      return [];
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 항목 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIItems = async (serviceId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: any = await api.get(`/service/${serviceId}/pi/allitems`);
    // 데이터 가공 및 결과 반환
    if (response.result && response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 처리방침 목록 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIPPs = async (serviceId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: any = await api.get(`/pipp/${serviceId}/publishedlist`);
    // 데이터 처리
    if (response.result && response.data) {
      const count: number = response.data.list ? response.data.list.length : 0;
      // 정렬
      const sorted: any[] = response.data.list ? response.data.list.sort((a: any, b: any): number => b.applyAt - a.applyAt) : [];
      // 가공
      const list: any[] = sorted.map((elem: any, index: number): any => ({ ...elem, version: count - index }));
      // 이전 처리방침이 있을 경우, 추가
      if (response.data.prevUrl) {
        list.push({
          applyAt: 0,
          version: 0,
          url: response.data.prevUrl
        });
      }
      return list;
    } else {
      return [];
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 서비스 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getService = async (serviceId: string): Promise<any> => {
  try {
    // API 호출
    const response: any = await api.get(`/service/${serviceId}`);
    // 데이터 가공 및 결과 반환
    return response.result && response.data ? response.data : undefined;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return undefined;
  }
}
/**
 * [API Caller] 서비스 목록 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export const getServices = async (companyId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: any = await api.get(`/company/${companyId}/details`);
    // 데이터 가공 및 결과 반환
    if (response.result && response.data && response.data.services) {
      return response.data.services.sort((a: any, b: any): number => a.createAt - b.createAt).map((item: any): any => ({
        createAt: item.createAt,
        id: item.id,
        key: item.id,
        serviceName: item.serviceName,
        types: item.types
      }));
    } else {
      return [];
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}

const consentType = (type: number): string => {
  switch(type) {
    case 0:
      return '개인정보';
    case 1:
      return '고유식별정보';
    case 2:
      return '마케팅';
    case 3:
      return '민감정보';
    default:
      return '제3자제공';
  }
}