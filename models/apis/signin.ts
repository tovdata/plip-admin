// Module
import { api, validateResponse } from '@/models/apis/core';
// Type
import { ResponseDF, SERVER_URL } from '@/models/type';

/**
 * [API Caller] 로그인
 * @param email 이메일
 * @param password 비밀번호
 * @returns 요청 결과
 */
export const signin = async (email: string, password: string): Promise<ResponseDF> => {
  try {
    // 요청 객체 생성
    const request: any = {
      body: JSON.stringify({ email, password }),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    };
    // API 호출
    const response = await fetch(`${SERVER_URL}/auth/signin`, request);
    // 결과 변환
    const result = await response.json();
    // 결과 반환
    if (validateResponse(result)) {
      return { result: true, data: result.data.AccessToken };
    } else {
      return { result: false };
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [API Caller] 로그아웃
 * @returns 요청 결과
 */
export const signout = async (): Promise<boolean> => {
  try {
    // API 호출
    return await api.post('/auth/signout');
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 관리자 권한 확인
 * @param userId 사용자 ID
 * @returns 조회 결과
 */
export const validateAdmin = async (userId: string): Promise<boolean> => {
  try {
    // API 호출
    const response: any = await api.get(`/user/${userId}`);
    // 결과 처리
    if (response.result && response.data) {
      if ('admin' in response.data) return response.data.admin;
      else return false;
    } else {
      return false;
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}