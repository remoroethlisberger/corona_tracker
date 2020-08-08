import React from 'react';
import PageWrapper from '../elements/PageWrapper/PageWrapper';
import { useTranslation } from 'react-i18next';

const FAQ = (props) => {
  const { t } = useTranslation();
  return (
    <PageWrapper {...props}>
      <ul>
        <li>
          <span className="font-weight-bold">{t('technology')}:</span>
          <br />
          <p>{t('techexplain')}</p>
        </li>
        <li>
          <span className="font-weight-bold">{t('idea-and-realisation')}:</span>
          <br />
          {t('data')}:{' '}
          <a href="https://www.besondere-lage.sites.be.ch/besondere-lage_sites/de/index/corona/index.html">
            https://www.besondere-lage.sites.be.ch/besondere-lage_sites/de/index/corona/index.html
          </a>
          <br />
          Webdesign: <a href="https://waremama.ch">waremama.ch</a>
          <br />
          Github Repository:{' '}
          <a href="https://github.com/remoroethlisberger/corona_tracker">
            https://github.com/remoroethlisberger/corona_tracker
          </a>
        </li>
      </ul>
    </PageWrapper>
  );
};

export default FAQ;
