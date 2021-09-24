import { atom } from 'jotai';

export const offsetAtom = atom<number>(0);
export const limitAtom = atom<number>(10);
export const pageCountAtom = atom<number>(0);
export const loadingAtom = atom<boolean>(false);

export const increaseOffsetAtom = atom(null, (get, set) => set(offsetAtom, get(offsetAtom) + get(limitAtom)));
export const decreaseOffsetAtom = atom(null, (get, set) => set(offsetAtom, get(offsetAtom) - get(limitAtom)));
