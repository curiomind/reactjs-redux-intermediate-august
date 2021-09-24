import { PostsTypes } from './types';
import { createSelector } from 'reselect';

export const initialPostState = {
  posts: [],
  offset: 0,
  limit: 10,
  pageCount: 0,
  loading: false,
};

export default function postsReducer(state = initialPostState, action) {
  switch (action.type) {
    case PostsTypes.GET_POSTS: {
      return { ...state, loading: true };
    }

    case PostsTypes.SAVE_POSTS: {
      return { ...state, posts: action.posts, loading: false, pageCount: action.posts.length / state.limit };
    }

    case PostsTypes.INCREASE_OFFSET: {
      return { ...state, offset: state.offset + state.limit };
    }

    case PostsTypes.DECREASE_OFFSET: {
      return { ...state, offset: state.offset - state.limit };
    }

    default:
      return state;
  }
}

export const selectPageCount = (state) => state.posts.pageCount;
export const selectLoading = (state) => state.posts.loading;
export const selectAllPosts = (state) => state.posts.posts;
export const selectOffset = (state) => state.posts.offset;
export const selectLimit = (state) => state.posts.limit;

export const selectPosts = createSelector(selectAllPosts, selectOffset, selectLimit, (posts, offset, limit) => {
  return posts.slice(offset, offset + limit);
});
