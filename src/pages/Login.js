import React from 'react';

import auth from '../helpers/auth';
import { useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PageWrapper from '../elements/PageWrapper/PageWrapper';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import api from '../helpers/api';

const Login = (props) => {
  const { t } = useTranslation();
  const [formdata, setFormdata] = useState({});
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    if (formdata.email && formdata.password) {
      let r = await api.login(formdata);
      if (r.status == 200) {
        auth.login(r.data.token);
        setIsLoggingIn(true);
      } else {
      }
    } else {
    }
  };

  const update = (e) => {
    let property = e.target.id;
    let value = e.target.value;
    setFormdata((prev) => {
      prev[property] = value;
      return { ...prev };
    });
  };

  if (auth.isValid()) {
    return <Redirect to="dashboard" />;
  } else {
    return (
      <PageWrapper {...props}>
        <div>
          <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
              <h4>Login</h4>
              <form onSubmit={login}>
                <div className="form-group">
                  <input
                    type="text"
                    id="email"
                    placeholder={t('email')}
                    onChange={update}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    placeholder={t('password')}
                    onChange={update}
                  />
                </div>
                <button className="btn btn-primary">Login</button>
              </form>
              <div className="my-2">
                <Link to={'/register'}>
                  <button className="btn btn-primary">{t('register')}</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    );
  }
};

export default Login;
