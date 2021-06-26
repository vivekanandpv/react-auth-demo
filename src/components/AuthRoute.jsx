import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authSlice } from '../store/auth-slice';
import {
  isLoggedIn,
  logout,
  isInRole,
  matchesAtLeastOneRole,
} from '../services/auth-service';

const AuthRoute = ({ component: Component, role, ...rest }) => {
  const loggedInState = useSelector((state) => state.auth.loggedIn);
  const authState = useSelector((state) => state.auth.auth);
  const dispatch = useDispatch();

  return (
    <Route
      {...rest}
      render={(props) => {
        //  Gurad: Authentication
        if (!loggedInState) {
          dispatch(authSlice.actions.recordLogout()); //  just in case if there is a expired token in session storage
          return (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          );
        }

        if (Array.isArray(role)) {
          //    Guard: Authorization (multiple with or condition)
          if (role && !matchesAtLeastOneRole(role, authState)) {
            return <Redirect to={{ pathname: '/unauthorized' }} />;
          }
        } else {
          //    Guard: Authorization (single role)
          if (role && !isInRole(role, authState)) {
            return <Redirect to={{ pathname: '/unauthorized' }} />;
          }
        }

        //    Route
        return <Component {...props} />;
      }}
    />
  );
};

export default AuthRoute;
