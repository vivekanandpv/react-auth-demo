import React from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Login from './Login';
import NotFound from './NotFound';
import AuthRoute from './AuthRoute';
import Unauthorized from './Unauthorized';

const Layout = (props) => {
  return (
    <>
      <Router>
        <Navbar />
        <div className='container p-5'>
          <Switch>
            <Route exact path='/home' component={Home} />
            <Route exact path='/' component={Home} />
            <AuthRoute
              exact
              path='/about'
              role='admin'
              // role={['management', 'finance', 'user']} //  for multiple roles
              component={About}
            />
            <Route exact path='/login' component={Login} />
            <Route exact path='/unauthorized' component={Unauthorized} />
            <Route path='*' component={NotFound} />
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default Layout;
