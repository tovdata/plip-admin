import { atom, selector } from 'recoil';
// Util
import { getAccessToken, removeAccessToken, setAccessToken } from '@/models/cookie';
import { removeUserId, setUserId } from '@/models/cookie';
import { updateToken } from '@/models/apis/core';
import { extractUserId } from 'utils/util';

/** [Internal Function] Unix timestamp 생성 */
const getUnixTimestamp = (): number => {
  return Math.floor((new Date()).getTime() / 1000);
}
/**
 * [Internal Function] 액세스 토큰 대한 데이터 동기 (조회/저장)
 * @returns 조회 시, 데이터 조회 결과
 */
const tokenEffects = () => ({ setSelf, onSet }: any): any => {
  // Get
  const value: string | undefined = getAccessToken();
  if (value) setSelf(value);
  // Set
  onSet((newValue: any) => {
    if (newValue !== '') {
      setAccessToken(newValue);
      // 사용자 ID 추출 및 저장
      const userId: string = extractUserId(newValue);
      if (userId !== '') setUserId(userId);
    } else {
      removeAccessToken();
      removeUserId();
    }
  });
}

/** [Atom] 액세스 토큰 */
const accessTokenAtom = atom<string | undefined>({
  key: `accessTokenAtom_${getUnixTimestamp()}`,
  default: undefined,
  effects: [tokenEffects()]
});

/** [Selector] 액세스 토큰 */
export const accessTokenSelector = selector<string | undefined>({
  key: `accessTokenSelector_${getUnixTimestamp()}`,
  get: async ({ get }) => {
    const token = get(accessTokenAtom);
    if (token) return token;
    // 사용자 ID를 이용하여 새로운 액세스 토큰 생성
    return await updateToken();
  },
  set: ({ set }, value) => {
    set(accessTokenAtom, value);
  }
});