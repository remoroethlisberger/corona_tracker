import React from 'react';
import { useMapContext } from '../../hooks/useMapContext';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faStepBackward,
  faStepForward,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

import { useTranslation } from 'react-i18next';
import { map } from 'd3';

const Controls = (props) => {
  const [mapState, dispatch] = useMapContext();
  const { t } = useTranslation();
  const OVER_THE_LAST = t('over_the_last');
  const DAYS = t('days');

  return (
    <div>
      <div className="mt-2 d-flex flex-row justify-content-around">
        <button
          className="btn btn-primary"
          onClick={() => dispatch({ type: 'previous' })}
          disabled={!(mapState.minDate < mapState.date)}
        >
          <FontAwesomeIcon icon={faStepBackward} />
        </button>
        <div>
          <button
            className="btn btn-primary mx-2"
            onClick={() => dispatch({ type: mapState.play ? 'pause' : 'play' })}
          >
            <FontAwesomeIcon icon={mapState.play ? faPause : faPlay} />{' '}
            {mapState.play ? t('pause') : t('play')}
          </button>
          <button
            disabled={mapState.intervalTime === 1000}
            className="btn btn-primary mx-2"
            onClick={() => dispatch({ type: 'speed', value: 1000 })}
          >
            1x
          </button>
          <button
            className="btn btn-primary mx-2"
            disabled={mapState.intervalTime === 500}
            onClick={() => dispatch({ type: 'speed', value: 500 })}
          >
            2x
          </button>
          <button
            className="btn btn-primary mx-2"
            disabled={mapState.intervalTime === 200}
            onClick={() => dispatch({ type: 'speed', value: 200 })}
          >
            5x
          </button>
          {window.innerWidth <= 800 ? (
            <></>
          ) : (
            <div style={{ width: '200px', float: 'right' }}>
              <select
                className="custom-select"
                value={mapState.n}
                onChange={(e) =>
                  dispatch({ type: 'changeN', value: e.target.value })
                }
              >
                <option value="15">{OVER_THE_LAST + ' 15 ' + DAYS}</option>
                <option value="10">{OVER_THE_LAST + ' 10 ' + DAYS}</option>
                <option value="5">{OVER_THE_LAST + ' 5 ' + DAYS}</option>
                <option value="3">{OVER_THE_LAST + ' 3 ' + DAYS}</option>
                <option value="1">{t('over_the_last_1')}</option>
              </select>
            </div>
          )}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => dispatch({ type: 'next' })}
          disabled={!(mapState.maxDate > mapState.date)}
        >
          <FontAwesomeIcon icon={faStepForward} />
        </button>
      </div>
      {window.innerWidth > 800 ? (
        <></>
      ) : (
        <div className="m-auto pt-2" style={{ width: '80%' }}>
          <select
            className="custom-select"
            value={mapState.n}
            onChange={(e) =>
              dispatch({ type: 'changeN', value: e.target.value })
            }
          >
            <option value="15">{OVER_THE_LAST + ' 15 ' + DAYS}</option>
            <option value="10">{OVER_THE_LAST + ' 10 ' + DAYS}</option>
            <option value="5">{OVER_THE_LAST + ' 5 ' + DAYS}</option>
            <option value="3">{OVER_THE_LAST + ' 3 ' + DAYS}</option>
            <option value="1">{t('over_the_last_1')}</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Controls;
