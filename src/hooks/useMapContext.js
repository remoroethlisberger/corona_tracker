import React, { useContext } from 'react';
import { MapContext } from '../context/MapContext/MapContext';

const useMapContext = () => {
  const state = useContext(MapContext);
  if (state === undefined) {
    throw new Error('useMapContext can only be used within MapContext');
  } else {
    return state;
  }
};

export { useMapContext };
