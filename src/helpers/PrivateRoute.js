import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './auth';

const PrivateRoute = (props) => {
  if (auth.getCookie() && auth.isValid()) {
    return <Route {...props} />;
  } else {
    return <Redirect to="login" />;
  }
};

export default PrivateRoute;
