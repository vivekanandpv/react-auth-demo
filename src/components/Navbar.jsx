import React from 'react';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authSlice } from '../store/auth-slice';
import { useHistory } from 'react-router';

const Navbar = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const dispatch = useDispatch();
  const history = useHistory();
  const logout = () => {
    dispatch(authSlice.actions.recordLogout());
    history.push('/login');
  };
  const login = () => {
    history.push('/login');
  };
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='#'>
            Navbar
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink
                  to='/home'
                  activeClassName='active'
                  className='nav-link'
                >
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  to='/about'
                  activeClassName='active'
                  className='nav-link'
                >
                  About
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink
                  to='/login'
                  activeClassName='active'
                  className='nav-link'
                >
                  Login
                </NavLink>
              </li>
            </ul>
            {isLoggedIn ? (
              <div>
                <button className='btn btn-danger btn-sm' onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className='btn btn-primary btn-sm' onClick={login}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
