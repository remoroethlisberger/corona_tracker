import { map } from 'd3';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMapContext } from '../../hooks/useMapContext';

const Info = (props) => {
  const [mapState, dispatch] = useMapContext();
  const { t } = useTranslation();

  let cases = mapState.data;
  let sum = 0;
  let today = 0;
  let recent_cases = [];
  for (let k = 0; k < cases.length; k++) {
    let delta =
      (mapState.date - cases[k].date) / 1000 / 60 / 60 / 24 / mapState.n;
    if (delta < 1 && delta >= 0) {
      sum += cases[k].cases;
      recent_cases.push({ date: cases[k].date, cases: cases[k].cases });
    }
  }

  for (let k = 0; k < cases.length; k++) {
    let delta = mapState.date - cases[k].date;
    if (delta == 0) {
      today += cases[k].cases;
    }
  }

  debugger;
  return (
    <div className="text-center">
      <span>
        {mapState.n == 1
          ? t('over_the_last_1')
          : t('over_the_last') + ' ' + mapState.n + ' ' + t('days')}
        : <span className="font-weight-bold">{sum}</span>
      </span>
      <br />
      <span className="">
        {t('today')}: <span className="font-weight-bold">{today}</span>
      </span>
    </div>
  );
};

export default Info;
