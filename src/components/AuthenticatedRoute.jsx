import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn, logout } from '../services/auth-service';

const AuthenticatedRoute = ({ component: Component, role, ...rest }) => (
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

      //    Guard: Authorization
      //   if (!isInRole(role)) {
      //     return <Redirect to={{ pathname: '/unauthorized' }} />;
      //   }

      //    Route
      return <Component {...props} />;
    }}
  />
);

export default AuthenticatedRoute;
