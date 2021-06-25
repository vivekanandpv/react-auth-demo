import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  isLoggedIn,
  logout,
  isInRole,
  matchesAtLeastOneRole,
} from '../services/auth-service';

const AuthRoute = ({ component: Component, role, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      //  Gurad: Authentication
      if (!isLoggedIn()) {
        logout(); //  just in case if there is a expired token in session storage
        return (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }

      if (Array.isArray(role)) {
        //    Guard: Authorization (multiple with or condition)
        if (role && !matchesAtLeastOneRole(role)) {
          return <Redirect to={{ pathname: '/unauthorized' }} />;
        }
      } else {
        //    Guard: Authorization (single role)
        if (role && !isInRole(role)) {
          return <Redirect to={{ pathname: '/unauthorized' }} />;
        }
      }

      //    Route
      return <Component {...props} />;
    }}
  />
);

export default AuthRoute;
