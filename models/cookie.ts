import Cookies from 'universal-cookie';
// Cookies
const cookies = new Cookies();
// Key
const KEY_TOKEN = 'auth';
const KEY_USER = 'uuid';
// Type
import type { JwtPayload } from 'jsonwebtoken';
// Util
import { decode } from 'jsonwebtoken';

/**
 * [Function] 액세스 토큰 저장
 * @param token 액세스 토큰
 */
export const setAccessToken = (token: string): void => {
  try {
    // 만료일 추출
    const expired = (decode(token) as JwtPayload).exp;
    // 쿠키에 저장
    if (expired) {
      setCookie(KEY_TOKEN, token, new Date(expired * 1000));
    }
  } catch (err) {
    console.error(`[COOKIE ERROR] ${err}`);
  }
}
/**
 * [Function] 사용자 ID 저장
 * @param userId 사용자 ID
 */
export const setUserId = (userId: string): void => {
  try {
    // 만료일 설정
    const today = new Date();
    const expires = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
    // 쿠키 설정
    setCookie(KEY_USER, userId, expires);
  } catch (err) {
    console.error(`[COOKIE ERROR] ${err}`);
  }
}
/**
 * [Function] 액세스 토큰 불러오기
 * @returns 액세스 토큰
 */
export const getAccessToken = (): string | undefined => {
  return cookies.get(KEY_TOKEN);
}
/**
 * [Function] 사용자 ID 불러오기
 * @returns 사용자 ID
 */
export const getUserId = (): string | undefined => {
  return cookies.get(KEY_USER);
}
/**
 * [Function] 액세스 토큰 제거
 */
export const removeAccessToken = (): void => {
  cookies.remove(KEY_TOKEN, { path: '/' });
}
/**
 * [Function] 사용자 ID 제거
 */
export const removeUserId = (): void => {
  cookies.remove(KEY_USER, { path: '/' });
}

/**
 * [Internal Function] 쿠키 저장
 * @param key 식별 키
 * @param value 저장할 데이터
 * @param expires 만료일 (milliseconds)
 */
const setCookie = (key: string, value: any, expires?: Date): void => {
  try {
    cookies.set(key, value, { path: '/', expires: expires ? expires : undefined });
  } catch (err) {
    console.error(`[COOKIE ERROR] ${err}`);
  }
}