import { put, takeLatest, all } from 'redux-saga/effects';
import { PostsTypes } from './types';

function* fetchPosts() {
  const posts = yield fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json());
  yield put({ type: PostsTypes.SAVE_POSTS, posts });
}

function* postsWatcher() {
  yield takeLatest(PostsTypes.GET_POSTS, fetchPosts);
}

export default function* postsSaga() {
  yield all([postsWatcher()]);
}
