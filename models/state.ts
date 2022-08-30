import { atom, selector } from 'recoil';

/** [Atom] 전체 회사 수 */
const companyCountAtom = atom<number>({
  key: 'companyCountAtom',
  default: 0
});
/** [Atom] 전체 서비스 수 */
const serviceCountAtom = atom<number>({
  key: 'serviceCountAtom',
  default: 0
});
/** [Atom] 전체 가입자 수 */
const userCountAtom = atom<number>({
  key: 'userCountAtom',
  default: 0
});

/** [Selector] 전체 회사 수에 대한 순수 함수 */
export const companyCountSelector = selector<number>({
  key: 'companyCountSelector',
  get: ({ get }) => get(companyCountAtom),
  set: ({ set }, newValue) => set(companyCountAtom, newValue)
});
/** [Selector] 전체 서비스 수에 대한 순수 함수 */
export const serviceCountSelector = selector<number>({
  key: 'serviceCountSelector',
  get: ({ get }) => get(serviceCountAtom),
  set: ({ set }, newValue) => set(serviceCountAtom, newValue)
});
/** [Selector] 전체 가입자 수에 대한 순수 함수 */
export const userCountSelector = selector<number>({
  key: 'userCountSelector',
  get: ({ get }) => get(userCountAtom),
  set: ({ set }, newValue) => set(userCountAtom, newValue)
});