import { AuthTypes } from './Type';
import authReducer, { initialAuthState } from './Reducer';

describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialAuthState);
  });

  it('should handle PASSWORD_MISMATCH', () => {
    const state = { ...initialAuthState, passwordMisMatch: true };
    expect(
      authReducer(initialAuthState, {
        type: AuthTypes.PASSWORD_MISMATCH,
      })
    ).toEqual(state);
  });
});
