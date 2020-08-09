import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PageWrapper.css';

import Navbar from '../Navbar/Navbar';

import ReactGA from 'react-ga';
import { useTranslation } from 'react-i18next';
ReactGA.initialize('UA-174993755-1');

const PageWrapper = (props) => {
  ReactGA.pageview(window.location.pathname + window.location.hash);
  const { t, i18n } = useTranslation();
  return (
    <div className="container p-0">
      <Navbar {...props} />
      <div className="main p-2">{props.children}</div>
      <footer>
        <div className="d-flex flex-row justify-content-around">
          <div className="small">
            <a href="https://waremama.ch">waremama.ch</a>
          </div>
          <div className="small">
            <a href="" onClick={() => i18n.changeLanguage('de')}>
              DE
            </a>
          </div>
          <div className="small">
            <a href="" onClick={() => i18n.changeLanguage('en')}>
              EN
            </a>
          </div>
          <div className="small">
            <a href="" onClick={() => i18n.changeLanguage('fr')}>
              FR
            </a>
          </div>
          <p className="small">Remo Röthlisberger, 2020</p>
        </div>
      </footer>
    </div>
  );
};

export default PageWrapper;
