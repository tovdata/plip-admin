import { api } from "@/apis/utilities/core";
// Utilities
import { catchRequestError, createResponseError } from "@/apis/utilities/error";
import { isEmptyObject } from "@/utilities/common";

/**
 * [API Caller] 로그인
 * @param email 이메일
 * @param password 비밀번호
 * @returns 로그인 결과
 */
export async function signin(email: string, password: string): Promise<any> {
  try {
    // API 호출
    const { data } = await api.post("/auth/signin", { email, password });
    // 응답 처리
    if (data.type === "USER_NOT_AUTHORIZED") return Promise.reject(createResponseError("Not authorized", 500, { url: "/auth/signin" }));
    else return data.AccessToken;
  } catch (err: any) {
    return catchRequestError(err);
  }
}
/**
 * [API Caller] 액세스 토큰 갱신
 * @param id 사용자 ID
 * @returns 갱신 결과
 */
export async function updateAccessToken(id: string): Promise<string | undefined> {
  try {
    // API 호출
    const { data } = await api.post("/auth/silentrefresh", { id });
    // 응답 처리
    return !isEmptyObject(data) ? data.AccessToken : undefined;
  } catch (err: any) {
    return catchRequestError(err);
  }
}