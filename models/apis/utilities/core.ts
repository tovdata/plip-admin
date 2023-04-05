import axios from "axios";
// Data type
import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from "axios";
// Query
import { updateAccessToken } from "@/apis/services/auth";
// Utilities
import { createResponseError } from "@/models/apis/utilities/error";
import { decodeAccessToken, getAccessToken, isAccessTokenExpired, setAccessToken } from "@/utilities/token";

// API 속성
const apiConfig: CreateAxiosDefaults<any> = {
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 15000,
  withCredentials: true
};

// 기본 API 인스턴스
export const api: AxiosInstance = axios.create(apiConfig);
// 인증을 포함하는 API 인스턴스
export const authApi: AxiosInstance = axios.create(apiConfig);

// 요청 인터셉트 (액세스 토큰)
authApi.interceptors.request.use(async (config: AxiosRequestConfig<any>): Promise<any> => {
  try {
    // 세션 내 액세스 토큰 조회
    const token: string | null = getAccessToken();
    // 토큰 복호화
    const decoded: any = decodeAccessToken(token);
    // 토큰 존재 여부 확인
    if (decoded === undefined ){
      window.location.href = '/login';
      return null;
    }
    // 토큰이 만료된 경우, 갱신
    if (isAccessTokenExpired(decoded.exp, true)) {
      // 토큰 유효 확인
      if (decoded.sub === undefined) {
        setAccessToken(undefined);
        window.location.href = '/login';
        return null;
      }
      // 토큰 갱신
      const updated: string | undefined = await updateAccessToken(decoded.sub);
      // 에러 처리
      if (updated === undefined) {
        setAccessToken(undefined);
        // 리프레쉬 토큰 만료 시
        window.location.href = '/login';
        return null;
      }
      // 갱신된 토큰 설정
      setAccessToken(updated);
      config.headers ? config.headers.Authorization = updated : config.headers = { Authorization: updated };
      return config;
    } else {
      // 헤더에 액세스 토큰 설정
      config.headers ? config.headers.Authorization = token : config.headers = { Authorization: token };
      // 설정 반환
      return config;
    }
  } catch (err: unknown) {
    console.log("error", err)
    return Promise.reject(createResponseError("Interceptor process error", 999, config));
  }
});