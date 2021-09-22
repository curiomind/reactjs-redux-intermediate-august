import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export function getMockStore(initialState) {
  const middleware = [thunk];
  const mockStoreCreator = configureStore(middleware);
  return mockStoreCreator(initialState);
}
