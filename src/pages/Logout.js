import React from 'react';

import auth from '../helpers/auth';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  auth.login('');

  return <Redirect key="home" to="home" />;
};

export default Logout;
