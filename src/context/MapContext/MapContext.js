import React, { useReducer, createContext } from 'react';
import { useImmerReducer } from 'use-immer';
import { getCasesById, parseDates, getMaxDate, getMinDate } from './helpers';

let data = require('../../assets/data/BE-cases.json');
data = parseDates(data);
const map = require('../../assets/data/be-municipalties-geo.json');

const MapContext = createContext();

const dispatch = (state, action) => {
  debugger;
  switch (action.type) {
    case 'next':
      if (state.date < state.maxDate) {
        state.date = new Date(state.date.setDate(state.date.getDate() + 1));
        state.update = true;
      } else if (state.date >= state.maxDate) {
        state.play = false;
      }
      break;
    case 'rerendered':
      state.update = false;
      break;
    case 'previous':
      if (state.date > state.minDate) {
        state.date = new Date(state.date.setDate(state.date.getDate() - 1));
        state.update = true;
      }
      break;
    case 'speed':
      state.intervalTime = action.value;
      break;
    case 'play':
      if (state.date >= state.maxDate) {
        state.play = true;
        state.date = new Date(state.minDate);
        state.update = true;
        state.interval = action.value;
      } else {
        state.play = true;
        state.interval = action.value;
      }
      break;
    case 'pause':
      state.play = false;
      break;
    case 'changeN':
      state.update = true;
      state.n = parseInt(action.value);
      break;
  }
  return;
};

let initialState = {
  data: data,
  map: map,
  casesById: getCasesById(map, data),
  minDate: new Date(getMinDate(data)),
  maxDate: new Date(getMaxDate(data)),
  date: new Date(getMaxDate(data)),
  days: 10,
  intervalTime: 1000,
  play: false,
  n: 10,
};

const MapProvider = (props) => {
  if (props.value) {
    initialState = props.value;
  }

  const [data, reducer] = useImmerReducer(dispatch, initialState);

  return (
    <MapContext.Provider value={[data, reducer]}>
      {props.children}
    </MapContext.Provider>
  );
};

export { dispatch, MapContext, MapProvider };
