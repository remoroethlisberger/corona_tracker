import React from 'react';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import HttpsRedirect from 'react-https-redirect';
import CoronaTracker from './pages/CoronaTracker';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translations from './assets/translations/translations.json';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './helpers/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import Analytics from './pages/Analytics';


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: translations,
    fallbackLng: 'en',
    debug: true,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });
ReactDOM.render(
  <React.StrictMode>
    <HttpsRedirect>
      <HashRouter>
        <Switch>
          <Route key="login" path="/login" component={Login} />
          <Route key="logout" path="/logout" component={Logout} />
          <PrivateRoute
            key="dashboard"
            path="/dashboard"
            component={Dashboard}
          />
          <Route key="register" path="/register" component={Register} />
          <Route key="contact" path="/contact" component={Contact} />
          <Route key="faq" path="/faq" component={FAQ} />
          <Route key="analytics" path="/analytics" component={Analytics} />
          <Route key="main" component={CoronaTracker} />
        </Switch>
      </HashRouter>
    </HttpsRedirect>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
