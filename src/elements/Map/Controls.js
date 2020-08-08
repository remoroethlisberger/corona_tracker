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
    <div className="d-flex flex-row justify-content-around">
      <button
        className="btn btn-primary"
        onClick={() => dispatch({ type: 'previous' })}
        disabled={!(mapState.minDate < mapState.date)}
      >
        <FontAwesomeIcon icon={faStepBackward} />
      </button>
      <button
        className="btn btn-primary"
        onClick={() => dispatch({ type: mapState.play ? 'pause' : 'play' })}
      >
        <FontAwesomeIcon icon={mapState.play ? faPause : faPlay} />{' '}
        {mapState.play ? t('pause') : t('play')}
      </button>
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
