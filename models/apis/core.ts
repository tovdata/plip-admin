import axios from 'axios';
// Module
import { decode } from 'jsonwebtoken';
import { getAccessToken, getUserId, setAccessToken } from '@/models/cookie';
// Type
import type { JwtPayload } from 'jsonwebtoken';
import { RESPONSE_STATUS_ERROR, RESPONSE_STATUS_INVALID_TOKEN, RESPONSE_STATUS_NOT_AUTHORIZED, RESPONSE_STATUS_NOT_FOUND, RESPONSE_STATUS_REQUEST_ERROR, RESPONSE_STATUS_TOKEN_EXPIRED, RESPONSE_STATUS_UNKNOWN_ERROR, SERVER_URL } from '@/models/type';
// Axios 설정
axios.defaults.baseURL = SERVER_URL;
axios.defaults.withCredentials = true;

// 인스턴스 생성
export const api = axios.create();
// 요청에 대한 인터셉터
api.interceptors.request.use(
  async (conf: any) => {
    let token: string | undefined = getAccessToken();
    if (token === undefined || !validateExpires(token)) {
      token = await updateToken();
      // 토큰 저장
      if (token) setAccessToken(token);
    }
    // 토큰이 있을 경우
    if (token) {
      conf.headers.common['Authorization'] = token;
    }
    // 템플릿 생성/수정 일 경우, Content Type 변환
    if ((conf.method === 'post' || conf.method === 'put') && (conf.url.includes('/template'))) {
      conf.headers.post['Content-Type'] = 'multipart/form-data;charset=utf-8';
      conf.headers.put['Content-Type'] = 'multipart/form-data;charset=utf-8';
    } else {
      conf.headers.common['Content-Type'] = 'application/json';
    }
    return conf;
  }
);
// 응답에 대한 인터셉터
api.interceptors.response.use(
  (res: any) => ({ result: validateResponse(res.data), data: res.data.data }),
  (err: any) => {
    // 에러 출력
    console.error(`[API ERROR] ${err.code} ${err.message}`);
    // 에러 반환
    return Promise.reject({ result: false, message: err.message });
  }
);

/**
 * [Function] 액세스 토큰 갱신
 * @returns 액세스 토큰
 */
export const updateToken = async (): Promise<string | undefined> => {
  try {
    // 사용자 ID 추출
    const userId = getUserId();
    if (userId) {
      // 요청 객체 생성
      const request: any = {
        body: JSON.stringify({ id: userId }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }
      // API 호출
      const response: any = await fetch(`${SERVER_URL}/auth/silentrefresh`, request);
      // 응답 데이터 변환
      const result: any = await response.json();
      console.log(request, result);
      // 에러 검증
      if (result.result) {
        return result.data && result.data.AccessToken ? result.data.AccessToken : undefined;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  } catch (err) {
    console.error(`[I_FUNC ERROR] ${err}`);
    return undefined;
  }
}
/**
 * [Function] 응답에 대한 에러 검증
 * @param response 응답 데이터
 * @returns 검증 결과
 */
export const validateResponse = (response: any): boolean => {
  try {
    if ('status' in response) {
      switch (response.status) {
        case RESPONSE_STATUS_ERROR:
          return printError('Internal server error', response.message);
        case RESPONSE_STATUS_REQUEST_ERROR:
          return printError('Request error', response.message);
        case RESPONSE_STATUS_UNKNOWN_ERROR:
          return printError('Unknown error', response.message);
        case RESPONSE_STATUS_NOT_FOUND:
          return printError('Not found', response.message);
        case RESPONSE_STATUS_NOT_AUTHORIZED:
          return printError('Not authorized', response.message);
        case RESPONSE_STATUS_TOKEN_EXPIRED:
          return printError('Token expired', response.message);
        case RESPONSE_STATUS_INVALID_TOKEN:
          return printError('Invalid token', response.message);
      }
      return true;
    } else {
      console.error(`[I_FUNC ERROR] Invaild a response data format`);
      return false;
    }
  } catch (err) {
    console.error(`[I_FUNC ERROR] ${err}`);
    return false;
  }
}

/**
 * [Internal Function] 에러 문구 출력
 * @param type 에러 유형
 * @param message 에러 메시지
 * @returns false
 */
const printError = (type: string, message?: string): boolean => {
  // 에러 출력
  console.error(`[QUERY ERROR] ${type}`, message ? `: ${message}` : '');
  // 결과 반환
  return false;
}
/**
 * [Internal Function] 만료일 검증
 * @param token 액세스 토큰
 * @returns 검증 결과
 */
const validateExpires = (token: string): boolean => {
  try {
    const extracted = decode(token) as JwtPayload;
    if (extracted.exp) {
      const currentTime: number = Math.floor(new Date().getTime() / 1000);
      return currentTime - extracted.exp < 0 ? true : false;
    } else {
      return false;
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}