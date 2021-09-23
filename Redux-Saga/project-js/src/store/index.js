import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import postsSaga from './postsSaga';
import postsReducer, { initialPostState } from './reducer';

const sagaMiddleware = createSagaMiddleware();

const initialState = {
  posts: initialPostState,
};

const rootReducer = combineReducers({
  posts: postsReducer,
});

let middleware = applyMiddleware(sagaMiddleware);

if (process.env.NODE_ENV !== 'production') {
  middleware = composeWithDevTools(applyMiddleware(sagaMiddleware, logger));
}

const store = createStore(rootReducer, initialState, middleware);

sagaMiddleware.run(postsSaga);

export default store;
