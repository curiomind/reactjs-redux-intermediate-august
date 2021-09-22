import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ component: Component, forManager, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (typeof forManager === 'boolean') {
          return forManager ? <Component {...props} /> : <Redirect to="/not-allowed" />;
        } else {
          return currentUser ? <Component {...props} /> : <Redirect to="/auth/login" />;
        }
      }}
    />
  );
}
