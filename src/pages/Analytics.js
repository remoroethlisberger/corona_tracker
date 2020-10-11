import React, { useMemo } from 'react';
import PageWrapper from '../elements/PageWrapper/PageWrapper';
import { Chart } from "react-charts";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import casesbyday from '../assets/data/dailycases.json'
import { set } from 'react-ga';


const Analytics = (props) => {
  const { i18n } = useTranslation();

  const [axisType, setAxisType] = useState('linear');

  const m = casesbyday.map(_case => {
    return {
      primary: new Date(_case.primary).toLocaleDateString(i18n.language),
      secondary: _case.secondary
    }
  })

  const data = () => {
    let modifieddata = [...m]
    for (let i = 0; i < modifieddata.length; i++) {
      modifieddata[i].primary = m[i].primary
      modifieddata[i].secondary = parseInt(modifieddata[i].secondary)
    }
    debugger;
    return modifieddata
  }
  const get7DayAverage = () => {
    let trendingLine = []
    let mydata = data()
    for (let i = 6; i < mydata.length; i++) {
      let sum = 0;
      for (let j = 0; j > -7; j--) {
        sum += mydata[i + j].secondary;
      }
      let entry = {}
      entry.primary = mydata[i].primary
      entry.secondary = sum / 7;
      trendingLine.push(entry)
    }
    return trendingLine
  }

  const series = React.useCallback(
    (s, i) => ({
      type: i ? "line" : "bar"
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom", show: true, showGrid: true },
      { position: "left", type: axisType, stacked: false, show: true }
    ],
    [axisType]
  );

  return (
    <PageWrapper {...props}>
      <br />
      <button onClick={() => { axisType == 'log' ? setAxisType('linear') : setAxisType('log') }} >{axisType == 'log' ? "Linear" : "Logarithmisch"}</button>
      <br />
      <div
        style={{
          width: '100%',
          height: '300px'
        }}>
        <Chart data={useMemo(() =>
          [{
            label: 'Fälle',
            data: data()
          }, {
            label: '7 Tage Durchschnitt',
            data: get7DayAverage()
          }], [])} series={series} axes={axes} tooltip />
      </div>
    </PageWrapper>
  );


};

export default Analytics;
