import React from 'react';
import PageWrapper from '../elements/PageWrapper/PageWrapper';
import { useTranslation } from 'react-i18next';

const Contact = (props) => {
  const { t } = useTranslation();

  return <PageWrapper {...props}></PageWrapper>;
};

export default Contact;
