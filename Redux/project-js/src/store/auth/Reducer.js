import { AuthTypes } from './Type';
import { createSelector } from 'reselect';

export const initialAuthState = {
  passwordMisMatch: false,
  signupLoading: false,
  signupError: '',
  signinLoading: false,
  signinSuccess: false,
  signinError: '',
  signoutLoading: false,
  signoutError: '',
  user: null,
  profileLoading: false,
  profileError: '',
  profile: null,
  isManager: false,
  unsubscribe: null,
};

export default function authReducer(state = initialAuthState, action) {
  switch (action.type) {
    case AuthTypes.RESET: {
      return { ...initialAuthState };
    }
    case AuthTypes.PASSWORD_MISMATCH: {
      return { ...state, passwordMisMatch: true };
    }
    case AuthTypes.PASSWORD_MATCH: {
      return { ...state, passwordMisMatch: false };
    }

    case AuthTypes.SIGNUP_STARTED: {
      return { ...state, signupLoading: true };
    }
    case AuthTypes.SIGNUP_ENDED: {
      return { ...state, signupLoading: false };
    }
    case AuthTypes.SIGNUP_ERROR: {
      return { ...state, signupError: action.errorMessage };
    }

    case AuthTypes.SIGNIN_STARTED: {
      return { ...state, signinLoading: true };
    }
    case AuthTypes.SIGNIN_ENDED: {
      return { ...state, signinLoading: false };
    }
    case AuthTypes.SIGNIN_SUCCESS: {
      return { ...state, signinSuccess: true };
    }
    case AuthTypes.SIGNIN_ERROR: {
      return { ...state, signinError: action.errorMessage };
    }

    case AuthTypes.SIGNOUT_STARTED: {
      return { ...state, signoutLoading: true };
    }
    case AuthTypes.SIGNOUT_ENDED: {
      return { ...state, signoutLoading: false, signinSuccess: false };
    }
    case AuthTypes.SIGNOUT_ERROR: {
      return { ...state, signoutError: action.errorMessage };
    }

    case AuthTypes.PROFILE_LOADING: {
      return { ...state, profileLoading: true };
    }
    case AuthTypes.PROFILE_LOADED: {
      return { ...state, profileLoading: false };
    }
    case AuthTypes.PROFILE_ERROR: {
      return { ...state, profileError: action.errorMessage };
    }
    case AuthTypes.SET_PROFILE: {
      return { ...state, profile: action.profile };
    }

    case AuthTypes.SET_USER: {
      return { ...state, user: action.user };
    }
    case AuthTypes.SET_IS_MANAGER: {
      return { ...state, isManager: action.status };
    }
    case AuthTypes.SET_UNSUBSCRIBE: {
      return { ...state, unsubscribe: action.unsubscribe };
    }

    default:
      return state;
  }
}

const selectedAuth = (state) => state.auth;
const selectedProfile = (state) => state.auth.profile;

export const selectedProfileInitial = createSelector(selectedProfile, (profile) => profile?.initials);
export const selectUser = createSelector(selectedAuth, (auth) => auth.user);
export const selectedIsManager = createSelector(selectedAuth, (auth) => auth.isManager);
export const selectHeader = createSelector(selectedProfileInitial, selectUser, selectedIsManager, (initials, user, isManager) => ({
  initials,
  user,
  isManager,
}));
