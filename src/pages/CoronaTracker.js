import React from 'react';
import PageWrapper from '../elements/PageWrapper/PageWrapper';
import { MapProvider } from '../context/MapContext/MapContext';
import Controls from '../elements/Map/Controls';
import Map from '../elements/Map/Map';
import Footer from '../elements/Map/Footer';
import { isMobile } from 'mobile-device-detect';

const CoronaTracker = (props) => {
  return (
    <PageWrapper {...props}>
      <MapProvider>
        <h2 className="text-center">COVID-19 Tracker {isMobile ? '🦠' : ''}</h2>
        <Map />
        <Controls />
        <Footer />
      </MapProvider>
    </PageWrapper>
  );
};

export default CoronaTracker;
