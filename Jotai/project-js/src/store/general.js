import { atom } from 'jotai';

export const offsetAtom = atom(0);
export const limitAtom = atom(10);
export const pageCountAtom = atom(0);
export const loadingAtom = atom(false);

export const increaseOffsetAtom = atom(null, (get, set) => set(offsetAtom, get(offsetAtom) + get(limitAtom)));
export const decreaseOffsetAtom = atom(null, (get, set) => set(offsetAtom, get(offsetAtom) - get(limitAtom)));
