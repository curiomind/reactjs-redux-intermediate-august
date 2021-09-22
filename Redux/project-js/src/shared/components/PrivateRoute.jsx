import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ component: Component, forManager, ...rest }) {
  const { user } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (typeof forManager === 'boolean') {
          return forManager ? <Component {...props} /> : <Redirect to="/not-allowed" />;
        } else {
          return user ? <Component {...props} /> : <Redirect to="/auth/login" />;
        }
      }}></Route>
  );
}

PrivateRoute.whyDidYouRender = {
  logOnDifferentValues: true,
  customName: 'WDYR-PrivateRoute',
};
