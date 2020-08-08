import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMapContext } from '../../hooks/useMapContext';

const Footer = () => {
  const [mapState, dispatch] = useMapContext();
  const { t, i18n } = useTranslation();

  return (
    <div className="py-5 d-flex flex-row justify-content-around">
      <div>
        {t('update') +
          ': ' +
          mapState.maxDate.toLocaleDateString(i18n.language)}
      </div>
      <div>
        {t('source') + ': '}
        <a href="https://www.besondere-lage.sites.be.ch/besondere-lage_sites/de/index/corona/index.html">
          Kanton Bern
        </a>
      </div>
    </div>
  );
};

export default Footer;
