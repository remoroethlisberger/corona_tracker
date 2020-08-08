import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PageWrapper.css';

const PageWrapper = (props) => {
  return (
    <div>
      <div>
        <Link to={'/contact'}>Kontakt</Link>
      </div>
      <div>{props.children}</div>
      <div>Body</div>
    </div>
  );
};

export default PageWrapper;
