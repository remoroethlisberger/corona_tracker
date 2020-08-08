import React from 'react';

import './Tooltip.css';
import { useTranslation } from 'react-i18next';

const Tooltip = (props) => {
  const { t, i18n } = useTranslation();
  if (!props.place) {
    return <></>;
  } else {
    return (
      <div id="tooltip" style={{ top: props.top, left: props.left }}>
        <span className="font-weight-bold">{props.place}</span>
        <div>
          {props.cases.length ? (
            <table className="table table-striped small">
              <thead>
                <tr>
                  <td>{t('date')}</td>
                  <td>{t('cases')}</td>
                </tr>
              </thead>
              <tbody>
                {props.cases.map((_case) => {
                  return (
                    <tr>
                      <td>{_case.date.toLocaleDateString(i18n.language)}</td>
                      <td>{_case.cases}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <td>Total:</td>
                <td>{props.sum}</td>
              </tfoot>
            </table>
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
};

export default Tooltip;
