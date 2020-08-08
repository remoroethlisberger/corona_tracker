import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PageWrapper.css';

import Navbar from '../Navbar/Navbar';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-174993755-1');

ReactGA.pageview(window.location.pathname + window.location.search);

const PageWrapper = (props) => {
  return (
    <div className="container p-0">
      <Navbar {...props} />
      <div className="main p-2">{props.children}</div>
      <footer>
        <div className="d-flex flex-row justify-content-around">
          <div className="small">
            <a href="https://waremama.ch">waremama.ch</a>
          </div>
          <p className="small">Remo Röthlisberger, 2020</p>
        </div>
      </footer>
    </div>
  );
};

export default PageWrapper;
