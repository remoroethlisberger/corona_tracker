import React from 'react';
import PageWrapper from '../elements/PageWrapper/PageWrapper';
import { MapProvider } from '../context/MapContext/MapContext';
import Controls from '../elements/Map/Controls';
import Map from '../elements/Map/Map';

const CoronaTracker = (props) => {
  return (
    <PageWrapper>
      <MapProvider>
        <Controls></Controls>
        <Map></Map>
      </MapProvider>
    </PageWrapper>
  );
};

export default CoronaTracker;
