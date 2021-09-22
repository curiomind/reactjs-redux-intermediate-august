import { batch } from 'react-redux';

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { AuthTypes } from './Type';
import { getFullName, getInitials } from '../../shared/utils/user';

export function setPasswordMismatch() {
  return {
    type: AuthTypes.PASSWORD_MISMATCH,
  };
}
export function setPasswordMatch() {
  return {
    type: AuthTypes.PASSWORD_MATCH,
  };
}

export function setSignupStarted() {
  return {
    type: AuthTypes.SIGNUP_STARTED,
  };
}
export function setSignupEnded() {
  return {
    type: AuthTypes.SIGNUP_ENDED,
  };
}
export function setSignUpError(errorMessage) {
  return {
    type: AuthTypes.SIGNUP_ERROR,
    errorMessage,
  };
}

export function setSigninStarted() {
  return {
    type: AuthTypes.SIGNIN_STARTED,
  };
}
export function setSigninEnded() {
  return {
    type: AuthTypes.SIGNIN_ENDED,
  };
}
export function setSignInSuccess() {
  return {
    type: AuthTypes.SIGNIN_SUCCESS,
  };
}
export function setSigninError(errorMessage) {
  return {
    type: AuthTypes.SIGNIN_ERROR,
    errorMessage,
  };
}

export function setSignoutStarted() {
  return {
    type: AuthTypes.SIGNOUT_STARTED,
  };
}
export function setSignoutEnded() {
  return {
    type: AuthTypes.SIGNOUT_ENDED,
  };
}
export function setSignoutError(errorMessage) {
  return {
    type: AuthTypes.SIGNOUT_ERROR,
    errorMessage,
  };
}

export function setProfileLoading() {
  return {
    type: AuthTypes.PROFILE_LOADING,
  };
}
export function setProfileLoaded() {
  return {
    type: AuthTypes.PROFILE_LOADED,
  };
}
export function setProfileError(errorMessage) {
  return {
    type: AuthTypes.PROFILE_ERROR,
    errorMessage,
  };
}
export function setProfile(profile) {
  return {
    type: AuthTypes.SET_PROFILE,
    profile,
  };
}

export function setUser(user) {
  return {
    type: AuthTypes.SET_USER,
    user,
  };
}
export function setIsManager(status) {
  return {
    type: AuthTypes.SET_IS_MANAGER,
    status,
  };
}
export function setUnsubscribe(unsubscribe) {
  return {
    type: AuthTypes.SET_UNSUBSCRIBE,
    unsubscribe,
  };
}

export function resetAuthStore() {
  return {
    type: AuthTypes.RESET,
  };
}

export function signup(email, password, passwordConfirm, firstName, lastName, role) {
  return async (dispatch, getState, { auth, db }) => {
    if (password !== passwordConfirm) {
      return dispatch(setPasswordMismatch());
    }

    batch(() => {
      dispatch(setPasswordMatch());
      dispatch(setSignupStarted());
    });

    const initials = getInitials(firstName, lastName);
    const fullName = getFullName(firstName, lastName);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), { firstName, lastName, role, initials, fullName }, { merge: true });
      return dispatch(setSignupEnded());
    } catch (error) {
      dispatch(setSignupEnded());
      return dispatch(setSignUpError(`Code: ${error.code} | Message: ${error.message}`));
    }
  };
}

export function signin(email, password) {
  return async (dispatch, getState, { auth }) => {
    try {
      dispatch(setSigninStarted());
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(setSigninEnded());
      return dispatch(setSignInSuccess());
    } catch (error) {
      dispatch(setSigninEnded());
      return dispatch(setSigninError(`Code: ${error.code} | Message: ${error.message}`));
    }
  };
}

export function signout() {
  return async (dispatch, getState, { auth }) => {
    try {
      dispatch(setSignoutStarted());
      await auth.signOut();
      dispatch(resetAuthStore());
      return dispatch(setSignoutEnded());
    } catch (error) {
      dispatch(setSignoutEnded());
      return dispatch(setSignoutError(`Code: ${error.code} | Message: ${error.message}`));
    }
  };
}

export function verifyAuthAndGetUserProfile() {
  return (dispatch, getState, { auth, db }) => {
    const authState = getState().auth;
    const { unsubscribe } = authState ? authState : null;

    if (unsubscribe) {
      unsubscribe();
      dispatch(setUnsubscribe(null));
    }

    const newUnsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));

      const { uid, email } = user ? user : { uid: null, email: null };

      if (uid) {
        dispatch(setProfileLoading());

        getDoc(doc(db, 'users', uid))
          .then((docSnap) => {
            const data = docSnap.data();
            const { role } = data;

            batch(() => {
              dispatch(setProfileLoaded());
              dispatch(setIsManager(role === 'manager'));
              dispatch(setProfile({ ...data, email }));
            });
          })
          .catch((error) => {
            batch(() => {
              dispatch(setProfileLoaded());
              dispatch(setProfileError(`Code: ${error.code} | Message: ${error.message}`));
            });
          });
      }
    });

    return dispatch(setUnsubscribe(newUnsubscribe));
  };
}

export function getUserProfile() {
  return async (dispatch, getState, { db }) => {
    dispatch(setProfileLoading());

    const { auth } = getState();
    const { user } = auth ? auth : { user: null };
    const { uid, email } = user ? user : { uid: null, email: null };

    if (uid) {
      try {
        const docSnap = await getDoc(doc(db, 'users', uid));
        const data = docSnap.data();
        const { role } = data;

        batch(() => {
          dispatch(setProfileLoaded());
          dispatch(setIsManager(role === 'manager'));
        });

        return dispatch(setProfile({ ...data, email }));
      } catch (error) {
        dispatch(setProfileLoaded());
        return dispatch(setProfileError(`Code: ${error.code} | Message: ${error.message}`));
      }
    } else {
      batch(() => {
        dispatch(setProfileLoaded());
        dispatch(setProfile(null));
      });
      return dispatch(setProfileError('User not available'));
    }
  };
}
