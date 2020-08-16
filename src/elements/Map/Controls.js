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

const Controls = (props) => {
  const [mapState, dispatch] = useMapContext();
  const { t } = useTranslation();

  return (
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
      </div>
      <button
        className="btn btn-primary"
        onClick={() => dispatch({ type: 'next' })}
        disabled={!(mapState.maxDate > mapState.date)}
      >
        <FontAwesomeIcon icon={faStepForward} />
      </button>
    </div>
  );
};

export default Controls;
