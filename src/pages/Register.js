import React from 'react';
import PageWrapper from '../elements/PageWrapper/PageWrapper';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../helpers/api';
import auth from '../helpers/auth';

const Register = (props) => {
  const { t } = useTranslation();
  const [formdata, setFormdata] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    let prop = e.target.id;
    let value = e.target.value;
    setFormdata((prev) => {
      prev[prop] = value;
      return { ...prev };
    });
  };

  const sendFormData = async () => {
    if (
      formdata['firstname'] &&
      formdata['lastname'] &&
      formdata['email'] &&
      formdata['password'] &&
      formdata['password'] == formdata['password2']
    ) {
      let r = await api.register(formdata);
      console.log(r);
      if (r.status == 200) {
        let token = r.data.token;
        auth.login(token);
        window.location = '/#/dashboard';
      } else {
        // TODO error handling!
        window.location = '/#/';
      }
    } else if (formdata['password'] != formdata['password2']) {
    }
  };

  return (
    <PageWrapper {...props} disableSocial={true}>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h4>{t('register')}</h4>
          </div>
          <div className="col-12 text-center mb-3">{t('register_now')}</div>
          <div className="col-6 offset-3">
            <div className="form-group">
              <input
                className="input-group"
                type="text"
                id="firstname"
                placeholder={t('firstname')}
                value={formdata.firstname || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className="input-group"
                type="text"
                id="lastname"
                placeholder={t('lastname')}
                value={formdata.lastname || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className="input-group"
                type="text"
                id="email"
                placeholder={t('email')}
                value={formdata.email || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className="input-group"
                type="password"
                id="password"
                placeholder={t('password')}
                value={formdata.password || ''}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className="input-group"
                type="password"
                id="password2"
                placeholder={t('password repeat')}
                value={formdata.password2 || ''}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group text-right">
              <button className="btn btn-primary" onClick={sendFormData}>
                {t('register')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};
export default Register;
