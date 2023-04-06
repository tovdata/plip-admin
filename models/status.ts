import dayjs from "dayjs";
import { atom, selector } from "recoil";

/**
 * [Internal Function] Timestamp 생성
 * @returns 현재 시간에 대한 Timestamp
 */
const getTimestamp = (): number => dayjs().unix();
/**
 * [Internal Function] 로컬 스토리지에 대한 조회/저장
 * @param key 세션 키
 * @returns 조회/요청 결과
 */
const localStorageEffect = (key: string) => ({ setSelf, onSet }: any): void => {
  const savedValue: string | null = typeof window !== "undefined" ? localStorage.getItem(key) : null;
  // 데이터 조회
  if (savedValue !== null) {
    setSelf(savedValue);
  }
  // 데이터 수정
  onSet((newValue: string | undefined): void => {
    typeof window !== "undefined" ? newValue ? localStorage.setItem(key, newValue) : localStorage.removeItem(key) : undefined;
  });
}

/** [Atom] 액세스 토큰 */
const accessTokenAtom = atom<string | undefined>({
  default: undefined,
  key: `accessTokenAtom/${getTimestamp()}`,
  effects: [localStorageEffect("pa-auth")]
});
/** [Atom] 회사 ID */
const companyIdAtom = atom<string | undefined>({
  default: undefined,
  key: `companyIdAtom/${getTimestamp()}`,
});
/** [Atom] 권한없음 */
const unauthorization = atom<boolean>({
  default: false,
  key: `unauthorization/${getTimestamp()}`
});

/** [Selector] 액세스 토큰 */
export const accessTokenSelector = selector<string>({
  key: `accessTokenSelector/${getTimestamp()}`,
  get: ({ get }) => get(accessTokenAtom) === undefined ? "" : get(accessTokenAtom) as string,
  set: ({ set }, value) => value === "" ? set(accessTokenAtom, undefined) : set(accessTokenAtom, value)
});
/** [Selector] 회사 ID */
export const companyIdSelector = selector<string>({
  key: `companyIdSelector/${getTimestamp()}`,
  get: ({ get }) => get(companyIdAtom) === undefined ? "" : get(companyIdAtom) as string,
  set: ({ set }, value) => value === "" ? set(companyIdAtom, undefined) : set(companyIdAtom, value)
});
/** [Selector] 권한없음 */
export const unauthorizationSelector = selector<boolean>({
  key: `unauthorizationSelector/${getTimestamp()}`,
  get: ({ get }) => get(unauthorization),
  set: ({ set }, value) => set(unauthorization, value)
});