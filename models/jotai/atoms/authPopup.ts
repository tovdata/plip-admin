import { atom, useAtomValue, useSetAtom } from 'jotai';

// 초기 상태 타입
interface InitialStateType {
  open: boolean;
}

// 초기 상태 값
const initialState: InitialStateType = {
  open: false
}

// 로그인 권한에 따른 팝업 상태 atom 생성
const authPopupAtom = atom<InitialStateType>(initialState);

export const useAuthPopupValue = () => useAtomValue(authPopupAtom);
export const useAuthPopupSetter = () => useSetAtom(authPopupAtom);