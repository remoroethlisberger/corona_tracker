import React, { useState, useEffect } from 'react';
import { useMapContext } from '../../hooks/useMapContext';
import Tooltip from './Tooltip';

import {
  select,
  zoom,
  map,
  geoPath,
  event,
  interpolateRgb,
  scaleLinear,
  selectAll,
} from 'd3';
import { useTranslation } from 'react-i18next';

const Map = (props) => {
  const { t } = useTranslation();
  const [mapState, dispatch] = useMapContext();
  const [node, setNode] = useState();
  const [tooltip, setTooltip] = useState({});
  const { i18n } = useTranslation();
  const colorScale = scaleLinear()
    .domain([0, 15])
    .range(['#5D3A9B', '#E66100'])
    .interpolate(interpolateRgb);

  const beginHover = (id, name) => {
    const cases = mapState.data.filter((d) => {
      return d.id == id;
    });

    let sum = 0;
    let recent_cases = [];
    for (let k = 0; k < cases.length; k++) {
      let delta = (mapState.date - cases[k].date) / 1000 / 60 / 60 / 24 / 10;
      if (delta <= 1 && delta >= 0) {
        sum += cases[k].cases;
        recent_cases.push({ date: cases[k].date, cases: cases[k].cases });
      }
    }

    recent_cases.sort((x, y) => {
      if (x.date < y.date) {
        return 1;
      } else {
        return -1;
      }
    });

    setTooltip({
      place: name,
      cases: recent_cases,
      sum: sum,
      show: true,
      left: event.pageX + 20,
      top: event.pageY + 20,
    });
  };

  useEffect(() => {
    if (node) {
      const svg = select(node).append('g').classed('graph', true);
      const countries = select('g')
        .selectAll('path')
        .data(mapState.map.features);

      select('svg.map').call(
        zoom().on('zoom', () => {
          svg.attr('transform', event.transform);
        })
      );

      countries
        .enter()
        .append('path')
        .attr('stroke', 'black')
        .each(function (d, i) {
          let sum = 0;
          let casesById = mapState.casesById.filter((c) => {
            return c.id == d.id;
          })[0];

          for (let k = 0; k < casesById.cases.length; k++) {
            let delta =
              (mapState.date - casesById.cases[k].date) /
              1000 /
              60 /
              60 /
              24 /
              10;
            if (delta <= 1 && delta >= 0) {
              sum += casesById.cases[k].cases;
            }
          }

          select(this)
            .attr('d', geoPath().projection(undefined)(d))
            // projection(scale())
            .style('transform', 'translate(-220px, -10px)')
            .attr('fill', colorScale(sum))
            .on('click', (d) => {
              //beginHover(d.id, d.properties.name)
            })
            .on('mouseenter', (d) => {
              select(this).raise().style('stroke', 'white');
              beginHover(d.id, d.properties.name);
            })
            .on('mouseleave', (d) => {
              select(this).transition().style('stroke', 'black');
              setTooltip(undefined);
            })
            .attr('id', d.id);
        });
      countries.exit().remove();
    }
  }, [node]);

  useEffect(() => {
    if (node && mapState.update) {
      selectAll('path').each(function (d, i) {
        if (d) {
          let id = d.id;
          let sum = 0;
          let casesById = mapState.casesById.filter((c) => {
            return c.id == id;
          })[0];

          for (let k = 0; k < casesById.cases.length; k++) {
            let delta =
              (mapState.date - casesById.cases[k].date) /
              1000 /
              60 /
              60 /
              24 /
              10;
            if (delta <= 1 && delta >= 0) {
              sum += casesById.cases[k].cases;
            }
          }
          select(this)
            .attr('fill', colorScale(sum))
            .on('mouseenter', (d) => {
              select(this).raise().style('stroke', 'white');
              beginHover(d.id, d.properties.name);
            });
        }
      });
      dispatch({ type: 'rerendered' });
    }
  }, [mapState.update]);

  useEffect(() => {
    if (mapState.play) {
      let interval = setInterval(
        () => dispatch({ type: 'next' }),
        mapState.intervalTime
      );
      dispatch({ type: 'play', value: interval });
    } else {
      clearInterval(mapState.interval);
    }
  }, [mapState.play]);

  return (
    <>
      <div className="text-center">
        <h4>
          {t('date') + ': '}
          {mapState.date.toLocaleDateString(i18n.language)}
        </h4>
      </div>
      <div
        className="mx-auto map-container text-center"
        style={{
          height: '500px',
          overflow: 'hidden',
          maxWidth: '600px',
        }}
      >
        <Tooltip {...tooltip} />
        <svg
          className="map border border-dark"
          width="100%"
          height="500px"
          ref={(node) => setNode(node)}
        ></svg>
      </div>
    </>
  );
};
export default Map;
