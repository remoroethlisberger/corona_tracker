import React from 'react';
import PageWrapper from '../elements/PageWrapper/PageWrapper';
import { MapProvider } from '../context/MapContext/MapContext';
import Controls from '../elements/Map/Controls';
import Map from '../elements/Map/Map';
import Info from '../elements/Info/Info';
import Footer from '../elements/Map/Footer';
import { isMobile } from 'mobile-device-detect';
import { useState } from 'react';

import Snowstorm from '../elements/Snowstorm/Snowstorm';
import { useMapContext } from '../hooks/useMapContext';

const CoronaTracker = (props) => {
  const [spreadIt, setSpreadIt] = useState(false);

  return (
    <PageWrapper {...props}>
      {spreadIt ? <Snowstorm /> : ''}
      <MapProvider>
        <h2 className="text-center">
          COVID-19 Tracker{' '}
          {isMobile ? (
            <span
              onClick={() => {
                setSpreadIt(true);
              }}
            >
              🦠
            </span>
          ) : (
              ''
            )}
        </h2>
        <Map>
          <Info />
        </Map>
        <Controls />
        <Footer />
      </MapProvider>
    </PageWrapper>
  );
};

export default CoronaTracker;
