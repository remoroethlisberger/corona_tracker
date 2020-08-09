import React from 'react';
import * as serviceWorker from './serviceWorker';
import { render, hydrate } from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import CoronaTracker from './pages/CoronaTracker';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translations from './assets/translations/translations.json';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';

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

const root = document.getElementById('root');

const App = (props) => {
  return (
    <React.StrictMode>
      <HashRouter>
        <Switch>
          <Route key="contact" path="/contact" component={Contact} />
          <Route key="faq" path="/faq" component={FAQ} />
          <Route key="main" component={CoronaTracker} />
        </Switch>
      </HashRouter>
    </React.StrictMode>
  );
};

if (root.hasChildNodes()) {
  hydrate(<App />, root);
} else {
  render(<App />, root);
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
