/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { auth, db } from '../services/firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = React.useState();
  const [profile, setProfile] = React.useState();
  const [loading, setLoading] = React.useState(true);
  const [isManager, setIsManager] = React.useState(false);
  const [isSales, setIsSales] = React.useState(false);
  const [error, setError] = React.useState('');

  function getInitials(firstName, lastName) {
    const initials = firstName[0] + lastName[0];
    return initials.toUpperCase();
  }

  function getFullName(firstName, lastName) {
    return `${firstName} ${lastName}`;
  }

  function setRole(role) {
    setIsManager(role === 'manager');
    setIsSales(role === 'sales');

    console.log('IsManager', role === 'manager');
    console.log('IsSales', role === 'sales');
  }

  function signup(email, password, passwordConfirm, firstName, lastName, role) {
    return new Promise((resolve) => {
      if (password !== passwordConfirm) {
        setError('Passwords do not match');
        resolve(false);
      } else {
        setLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const userRef = doc(db, 'users', userCredential.user.uid);
            const initials = getInitials(firstName, lastName);
            const fullName = getFullName(firstName, lastName);
            return setDoc(userRef, { firstName, lastName, role, initials, fullName }, { merge: true });
          })
          .then(() => {
            setLoading(false);
            resolve(true);
          })
          .catch((err) => {
            setLoading(false);
            const errorCode = err.code;
            const errorMessage = err.message;
            setError(`Code: ${errorCode} | Message: ${errorMessage}`);
            resolve(false);
          });
      }
    });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function getUserProfile(user) {
    if (user) {
      const userRef = doc(db, 'users', user.uid);
      getDoc(userRef)
        .then((docSnap) => {
          const useData = docSnap.data();
          setProfile({ ...useData, email: user.email });
          setRole(useData.role);
          console.log('profile', { ...useData, email: user.email });
        })
        .catch((err) => {
          const errorCode = err.code;
          const errorMessage = err.message;
          setError(`Code: ${errorCode} | Message: ${errorMessage}`);
          setProfile();
          setRole(null);
        });
    } else {
      setProfile();
      setRole(null);
    }
  }

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      getUserProfile(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    isManager,
    isSales,
    currentUser,
    profile,
    error,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
AuthProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
