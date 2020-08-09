import React from 'react';
import { useEffect } from 'react';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Sidebar = (props) => {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState(false);
  const [animate, setAniamte] = useState(false);
  useEffect(() => {
    if (props.show) {
      setState(true);
    }
    animate == 'hide' ? setAniamte('visible') : setAniamte('hide');
  }, [props.show]);

  const variants = {
    hidden: { display: 'none' },
    visible: {
      display: 'block',
      position: 'relative',
      width: [50, 150, 250, 350],
      opacity: [0, 0.4, 0.7, 1],
    },
    hide: {
      display: ['none', 'none', 'none', 'none'],
      position: 'relative',
      height: '100%',
      width: [350, 250, 150, 0],
      opacity: [1, 0.7, 0.4, 0],
    },
  };

  let sum = 0;
  return (
    <motion.div
      initial={'hidden'}
      animate={
        state ? (state && animate == 'hide' ? 'hide' : 'visible') : 'hidden'
      }
      variants={variants}
      transition={{
        duration: 0.4,
      }}
      className="map-detail"
      style={{ overflow: 'scroll' }}
    >
      <div className="d-flex flex-row justify-content-around">
        <h2>{props.place}</h2>
        <button
          onClick={props.clear}
          className="btn btn-warning text-center my-auto py-auto"
          style={{ width: '35px', height: '35px' }}
        >
          x
        </button>
      </div>
      {props.cases && props.cases.length ? (
        <table className="table table-striped">
          <thead style={{ fontWeight: 'bold' }}>
            <tr>
              <td>{t('date')}</td>
              <td>{t('cases')}</td>
            </tr>
          </thead>
          <tbody>
            {props.cases.map((_case, i) => {
              i == 0 ? (sum = 0) : (sum = sum);
              sum += _case.cases;
              return (
                <tr>
                  <td
                    className="text-left pl-5"
                    style={{
                      color:
                        _case.date.toLocaleDateString(i18n.language, {
                          weekday: 'short',
                        }) == 'So'
                          ? 'white'
                          : '',
                      backgroundColor:
                        _case.date.toLocaleDateString(i18n.language, {
                          weekday: 'short',
                        }) == 'So'
                          ? 'red'
                          : '',
                    }}
                  >
                    {_case.date.toLocaleDateString(i18n.language, {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                  <td>{_case.cases}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="font-weight-bold">
              <td>Total:</td>
              <td>{sum}</td>
            </tr>
          </tfoot>
        </table>
      ) : (
        'Keine aktive COVID-19 Fälle innerhalb der letzten 10 Tage'
      )}
    </motion.div>
  );
};

export default Sidebar;
