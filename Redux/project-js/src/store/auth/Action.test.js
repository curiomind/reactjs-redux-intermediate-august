import * as Actions from './Action';
import { AuthTypes } from './Type';
import { initialAuthState } from './Reducer';

import { getMockStore } from '../../test-utils/MockStore';

let store;

describe('Auth Actions', () => {
  beforeEach(() => {
    store = getMockStore({ auth: initialAuthState });
  });

  afterEach(() => {
    store.clearActions();
  });

  it('Password Mismatch', () => {
    const expectedAction = [
      {
        type: AuthTypes.PASSWORD_MISMATCH,
      },
    ];
    store.dispatch(Actions.setPasswordMismatch());
    expect(store.getActions()).toEqual(expectedAction);
  });
});
