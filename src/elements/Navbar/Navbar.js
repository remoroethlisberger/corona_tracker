import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Navbar = (props) => {
  const {
    location: { pathname },
  } = props;

  const { t } = useTranslation();

  const [collapsed, setCollapsed] = useState(true);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        Corona Tracker
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={collapsed ? 'collapse navbar-collapse' : 'navbar-collapse'}
        id="navbar"
      >
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className={pathname == '/' ? 'nav-item active' : 'nav-item'}>
            <a className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li
            className={pathname == '/contact' ? 'nav-item active' : 'nav-item'}
          >
            <Link className="nav-link" to={'/contact'}>
              {t('contact')}
            </Link>
          </li>
          <li className={pathname == '/faq' ? 'nav-item active' : 'nav-item'}>
            <Link className="nav-link" to={'/faq'}>
              FAQ
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
