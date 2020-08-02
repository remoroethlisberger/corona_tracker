import React, { useState, useEffect } from 'react';
import { geoPath, geoTransform } from 'd3-geo';
import municipalities from './be-municipalties-geo.json';
import {
  select,
  scaleLinear,
  interpolateHclLong,
  zoom,
  event,
  interpolateRgbBasisClosed,
  interpolateRgbBasis,
  interpolateRgb,
  min,
} from 'd3';
import { useTranslation, initReactI18next } from 'react-i18next';

const data = require('./data.json');

let mindate = '2025-01-01';
let maxdate = '2020-01-01';
data.forEach((el) => {
  if (el.date >= maxdate) {
    maxdate = el.date;
  }
  if (el.date <= mindate) {
    mindate = el.date;
  }
});

const steps = Math.floor(
  (new Date(maxdate) - new Date(mindate)) / (1000 * 60 * 60 * 24)
);

const Map = () => {
  const { t } = useTranslation();
  const [rerender, setRerender] = useState(true);
  const [currentStep, setCurrentStep] = useState(steps);
  const [node, setNode] = useState(undefined);
  const [tooltip, setTooltip] = useState(undefined);

  const isMobile = window.innerWidth <= 500;

  const formatCases = (cases) => {
    let str = '';
    let sum = 0;

    for (let i = 0; i < cases.length; i++) {
      sum += cases[i].cases;
      str += cases[i].date + ': ' + cases[i].cases + ' ' + '<br/>';
    }
    if (str.length) {
      return t('Fälle der letzten zehn Tage') + `: ${sum}<br/>` + str;
    } else {
      return t('Keine aktuelle Fälle');
    }
  };

  const beginHover = (id, name) => {
    let cmaxdate = new Date(maxdate);
    cmaxdate.setDate(cmaxdate.getDate() - currentStep + 1);
    let cmindate = new Date(maxdate);
    cmindate.setDate(cmindate.getDate() - 10 - currentStep + 1);
    debugger;

    let cases = data.filter((d) => {
      return (
        d.id == id &&
        new Date(d.date) <= cmaxdate &&
        new Date(d.date) >= cmindate
      );
    });

    select('[class=tooltip]')
      .style('opacity', 1)
      .style('padding', '5px')
      .html(`${name} <br/>` + formatCases(cases))
      .style('left', event.pageX + 20 + 'px')
      .style('top', event.pageY + 20 + 'px');
  };

  const endHover = (id) => {
    var el = select(`[id="${id}"]`);
    el.transition().style('stroke', 'black');
    select('[class=tooltip]').style('opacity', 0);
  };
  function scale(scaleFactor, width = 1200, height = 0) {
    return geoTransform({
      point: function (x, y) {
        this.stream.point(
          (x - width / 2) * scaleFactor + width / 2,
          (y - height / 2) * scaleFactor + height / 2
        );
      },
    });
  }

  const colorScale = scaleLinear()
    .domain([0, 10])
    .range(['#5D3A9B', '#E66100'])
    .interpolate(interpolateRgb);
  const render = () => {
    let svg = select(node).append('g').classed('graph', true);
    const countries = select('g')
      //.attr('transform', 'translate(-400, 0)')
      .selectAll('path')
      .data(municipalities.features);

    select('div.map').call(
      zoom().on('zoom', () => {
        svg.attr('transform', event.transform);
      })
    );
    countries
      .enter()
      .append('path')
      .attr('stroke', 'black')
      .each(function (d, i) {
        let cases = data.filter((c) => {
          let cmaxdate = new Date(maxdate);
          cmaxdate.setDate(cmaxdate.getDate() - currentStep);
          let cmindate = new Date(maxdate);
          cmindate.setDate(cmindate.getDate() - 10 - currentStep);
          return (
            c.id == d.id &&
            new Date(c.date) <= cmaxdate &&
            new Date(c.date) >= cmindate
          );
        });
        let sum = 0;
        for (let k = 0; k < cases.length; k++) {
          sum += cases[k].cases;
        }

        let s = isMobile
          ? { k: 0.75, w: -1250 }
          : { k: 1.4, w: 1400 - window.innerWidth };
        select(this)
          .attr('d', geoPath().projection(scale(s.k, s.w))(d))
          //.style('transform', 'translate(-100px, 0px)')
          .attr('fill', colorScale(sum))
          .on('click', (d) => {
            select(this).raise();
            select(this).style('stroke', 'white');
            beginHover(d.id, d.properties.name);
          })
          .on('mouseenter', (d) => {
            select(this).raise();
            select(this).style('stroke', 'white');
            beginHover(d.id, d.properties.name);
          })
          .on('mouseleave', (d) => {
            select(this).transition().style('stroke', 'black');
            //endHover(d.id);
          })
          .attr('id', d.id);
      });

    countries.exit().remove();
  };

  const playback = () => {
    if (currentStep == 0) {
      setCurrentStep(steps);
    } else {
      setCurrentStep((currentStep - 1) % steps);
    }
  };

  useEffect(() => {
    setTimeout(playback, 1500);
    const countries = select('g')
      //.attr('transform', 'translate(-400, 0)')
      .selectAll('path');
    let cmaxdate = new Date(maxdate);
    cmaxdate.setDate(cmaxdate.getDate() - currentStep + 1);
    let cmindate = new Date(maxdate);
    cmindate.setDate(cmindate.getDate() - 10 - currentStep + 1);

    countries.each(function (d, i) {
      let cases = data.filter((c) => {
        return (
          c.id == d.id &&
          new Date(c.date) <= cmaxdate &&
          new Date(c.date) >= cmindate
        );
      });
      let sum = 0;
      for (let k = 0; k < cases.length; k++) {
        sum += cases[k].cases;
      }
      select(this)
        .attr('fill', colorScale(sum))
        .on('click', (d) => beginHover(d.id, d.properties.name))
        .on('mouseenter', (d) => {
          select(this).raise();
          select(this).style('stroke', 'white');
          beginHover(d.id, d.properties.name);
        })
        .on('mouseleave', (d) => {
          select(this).transition().style('stroke', 'black');
          //endHover(d.id);
        });
    });

    select('.tooltip').style('opacity', 0);
  }, [currentStep]);

  useEffect(() => {
    debugger;
    if (rerender) {
      if (node) {
        let tp = select('body')
          .append('div')
          .attr('class', 'tooltip')
          .style('opacity', 0)
          .style('position', 'fixed')
          .style('background-color', 'white');
        render();
        setRerender(false);
        setTooltip(tp);
      }
    }
  }, [node, rerender]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center">
          <div
            style={{
              maxHeight: isMobile ? '15vh' : '5vh',
              height: isMobile ? '15vh' : '5vh',
            }}
          >
            <h2>{t('Aktuelle Corona Fälle im Kanton Bern')}</h2>
          </div>
        </div>
        <div className="col-12">
          <div
            style={{ width: '100vw', height: isMobile ? '60vh' : '90vh' }}
            className="map"
          >
            <svg width="100%" height="100%" ref={(node) => setNode(node)}></svg>
          </div>
        </div>

        <div className="col-12">
          <div className="d-flex flex-row justify-content-around">
            <div>
              {t('Stand')}: {new Date(maxdate).toLocaleDateString()}
            </div>
            <div>
              {t('Quelle')}:{' '}
              <a href="https://www.besondere-lage.sites.be.ch/besondere-lage_sites/de/index/corona/index.html#originRequestUrl=www.be.ch/corona">
                Kanton Bern
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
