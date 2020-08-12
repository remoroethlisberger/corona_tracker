import React from 'react';

import './SocialMediaBar.css';

import Email from './Email/Email';
import Facebook from './Facebook/Facebook';
import Twitter from './Twitter/Twitter';
import LinkedIn from './LinkedIn/LinkedIn';
import Reddit from './Reddit/Reddit';
import WhatsApp from './WhatsApp/WhatsApp';
import { useState, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SocialMediaBar = (props) => {
  const { t } = useTranslation();

  const [mobile, setMobile] = useState(false);
  const updateSize = () => {
    if (window.innerWidth <= 1000) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  };
  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const data = {
    mobile: mobile,
    subject: 'Corona Tracker - BE',
    url: window.origin,
    body: t('share_message'),
  };

  return (
    <div className="d-flex flex-row justify-content-center pt-5 pb-2">
      <Email {...data} />
      <Twitter {...data} />
      <Facebook {...data} />
      <LinkedIn {...data} />
      <Reddit {...data} />
      <WhatsApp {...data} />
    </div>
  );
};

export default SocialMediaBar;
