// Module
import { validateResponse } from './core';
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