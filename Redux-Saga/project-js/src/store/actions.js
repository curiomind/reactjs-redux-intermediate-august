import { PostsTypes } from './types';

export function getPosts() {
  return {
    type: PostsTypes.GET_POSTS,
  };
}

export function increaseOffset() {
  return {
    type: PostsTypes.INCREASE_OFFSET,
  };
}

export function decreaseOffset() {
  return {
    type: PostsTypes.DECREASE_OFFSET,
  };
}
