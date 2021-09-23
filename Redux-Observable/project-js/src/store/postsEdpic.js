import { map, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { ofType } from 'redux-observable';
import { PostsTypes } from './types';
import { savePosts } from './actions';

export function getPostsEpic(action$, state$) {
  return action$.pipe(
    ofType(PostsTypes.GET_POSTS),
    mergeMap((action) =>
      from(fetch('https://jsonplaceholder.typicode.com/posts').then((response) => response.json())).pipe(map((response) => savePosts(response)))
    )
  );
}
