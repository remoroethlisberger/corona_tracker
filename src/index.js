import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
i18n
  .use(Backend)
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          'Aktuelle Corona Fälle im Kanton Bern':
            'Current COVID cases within canton of Bern',
          'Keine aktuelle Fälle': 'No current incidents',
          'Fälle der letzten zehn Tage': 'Cases over the last ten days',
          Quelle: 'Source',
          Fälle: 'Cases',
          Datum: 'Date',
          Stand: 'Last update',
        },
      },
      de: {
        translation: {
          'Aktuelle Corona Fälle im Kanton Bern':
            'Aktuelle Corona Fälle im Kanton Bern',
          'Keine aktuelle Fälle': 'Keine aktuelle Fälle',
          'Fälle der letzten zehn Tage': 'Fälle der letzten zehn Tage',
          Quelle: 'Quelle',
          Fälle: 'Fälle',
          Datum: 'Datum',
          Stand: 'Letztes Update',
        },
      },
    },
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
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
