import React from 'react';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';

const Navbar = (props) => {
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
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
