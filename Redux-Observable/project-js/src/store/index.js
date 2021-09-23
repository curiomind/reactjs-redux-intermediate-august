import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { getPostsEpic } from './postsEdpic';
import postsReducer, { initialPostState } from './reducer';

const rootEpic = combineEpics(getPostsEpic);
const epicMiddleware = createEpicMiddleware();

const initialState = {
  posts: initialPostState,
};

const rootReducer = combineReducers({
  posts: postsReducer,
});

let middleware = applyMiddleware(epicMiddleware);

if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(applyMiddleware(epicMiddleware, logger));
}

const store = createStore(rootReducer, initialState, middleware);

epicMiddleware.run(rootEpic);

export default store;
