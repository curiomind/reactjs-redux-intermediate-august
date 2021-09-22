import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './auth/Reducer';
import todoReducer from './todos/Reducer';
import { verifyAuthAndGetUserProfile } from './auth/Action';

import { auth, db } from '../shared/services/firebase';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['auth', 'todos'],
};

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: [
    'passwordMisMatch',
    'signupLoading',
    'signupError',
    'signinLoading',
    'signinSuccess',
    'signinError',
    'signoutLoading',
    'signoutError',
    'profileLoading',
    'profileError',
    'unsubscribe',
  ],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  todos: todoReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export function configureStore(initialState) {
  let middleware = applyMiddleware(thunk.withExtraArgument({ auth, db }));

  if (process.env.NODE_ENV !== 'production') {
    middleware = composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ auth, db }), logger));
  }

  const store = createStore(persistedReducer, initialState, middleware);
  const persistor = persistStore(store);
  store.dispatch(verifyAuthAndGetUserProfile());
  return { store, persistor };
}
