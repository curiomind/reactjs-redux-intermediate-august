import { atom } from 'jotai';
import { Post } from '../models';
import { limitAtom, loadingAtom, offsetAtom, pageCountAtom } from './general';

export const postsAtom = atom<Post[]>([]);

export const getPostAtom = atom(
  (get) => get(postsAtom).slice(get(offsetAtom), get(offsetAtom) + get(limitAtom)),
  async (get, set) => {
    set(loadingAtom, true);
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    set(postsAtom, data);
    set(pageCountAtom, data.length / get(limitAtom));
    set(loadingAtom, false);
    console.log(get(pageCountAtom), get(loadingAtom), get(postsAtom));
  }
);
