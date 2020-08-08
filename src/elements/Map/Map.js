import React, { useState, useEffect } from 'react';
import { useMapContext } from '../../hooks/useMapContext';

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
  const [mapState, dispatch] = useMapContext();
  const [node, setNode] = useState();
  const { i18n } = useTranslation();
  const colorScale = scaleLinear()
    .domain([0, 15])
    .range(['#5D3A9B', '#E66100'])
    .interpolate(interpolateRgb);

  useEffect(() => {
    if (node) {
      const svg = select(node).append('g').classed('graph', true);
      const countries = select('g')
        .selectAll('path')
        .data(mapState.map.features);

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
            //.style('transform', 'translate(-100px, 0px)')
            .attr('fill', colorScale(sum))
            .on('click', (d) => {
              //beginHover(d.id, d.properties.name)
            })
            .on('mouseenter', (d) => {
              select(this).raise().style('stroke', 'white');
              //              beginHover(d.id, d.properties.name);
            })
            .on('mouseleave', (d) => {
              select(this).transition().style('stroke', 'black');
              //endHover(d.id);
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
          select(this).attr('fill', colorScale(sum));
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
    <div className="map" style={{ height: '100vh' }}>
      {mapState.date.toLocaleDateString(i18n.language)}
      <svg width="100%" height="100%" ref={(node) => setNode(node)}></svg>
    </div>
  );
};
export default Map;
