import React, { useMemo } from 'react';
import PageWrapper from '../elements/PageWrapper/PageWrapper';
import { Chart } from "react-charts";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import casesbyday from '../assets/data/dailycases.json'


import ReactGA from 'react-ga';

import {
  select,
  zoom,
  axisLeft,
  line,
  axisBottom,
  geoPath,
  event,
  interpolateRgb,
  scaleLinear,
  scaleBand,
  selectAll,
  scaleOrdinal,
  max,
  timeFormat
} from 'd3';
import { useEffect } from 'react';

const Analytics = (props) => {

  const { t } = useTranslation();
  const [node, setNode] = useState();
  const { i18n } = useTranslation();

  const width = 600
  const x = scaleBand().domain(casesbyday.map(c => { return new Date(c.primary) })).rangeRound([0, width]).paddingInner(0.2)
  const cx = scaleBand().domain(casesbyday.map(c => { return new Date(c.primary) })).rangeRound([0, width]).paddingInner(0.2)
  const y = scaleLinear().domain([0, max(casesbyday, (d) => { return d.secondary })]).range([400, 0])

  useEffect(() => {

    if (node) {
      const xAxis = axisBottom().scale(x).tickFormat((_, i) => {
        if (i % 7 == 0) {
          return _.toLocaleDateString('en')
        } else {
          return ""
        }
      })

      const yAxis = axisLeft().scale(y)
      const svg = select(node).append('g').classed('graph', true).attr('transform', 'translate(50,0)')

      select('svg.map').call(
        zoom().on('zoom', () => {
          svg.attr('transform', event.transform)
        })
      );
      const cases = select(node).select('g').selectAll('rect')
        .data(casesbyday);


      let l = line()
        .x(function (d, i) { return cx(new Date(d.primary)) + x.bandwidth() / 2 })
        .y(function (d, i) {
          let sum = 0;
          for (let j = 0; j < 6; j++) {
            sum += casesbyday[i + 6 - j].secondary
          }
          debugger
          return y(sum / 7)

        })

      /* 
      .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(d.value) })
      )
      */

      // plot y axis 
      select(node).select('g').append('g')
        .attr("class", "y axis")
        .call(yAxis);
      select(node).select('g').append('g')
        .attr("class", "grid")
        .style("stroke-width", 0.5)
        .call(axisLeft(y).ticks(5).tickSize(-width).tickFormat(() => { return "" }));

      // plot x axis
      select(node).select('g').append('g')
        .attr("transform", "translate(0," + 400 + ")").call(xAxis).selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)");
      debugger

      cases
        .enter()
        .append('rect')
        .style("fill", "steelblue")
        .attr("x", function (d) { return x(new Date(d.primary)); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.secondary); })
        .attr("height", function (d) { return 400 - y(d.secondary); });


      select(node).select('g')
        .append('path')
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("d", l(casesbyday.filter((p, i) => {
          if (i > 6) {
            return true
          } else {
            return false
          }
        })))


      select(node).select("g").selectAll(".dot")
        .data(casesbyday.filter((p, i) => {
          if (i > 6) {
            return true
          } else {
            return false
          }
        }))
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot")
        .style("fill", "red") // Assign a class for styling
        .attr("cx", function (d, i) { return cx(new Date(d.primary)) + x.bandwidth() / 2 })
        .attr("cy", function (d, i) {
          let sum = 0;
          for (let j = 0; j < 6; j++) {
            sum += casesbyday[i + 6 - j].secondary
          }
          debugger
          return y(sum / 7)
        })
        .attr("r", 2)
        .on("mouseover", (d, i) => {
          console.log(d.primary)
          console.log(d.secondary)
        })
      cases.exit().remove();
    }
  }, [node]);


  return (
    <PageWrapper {...props}>
      <div className="text-center">
      </div>
      {props.children}
      <div
        className="mx-auto text-center"
        style={{
          height: '500px',
          overflow: 'hidden',
          maxWidth: '700px',
        }}
      >
        <svg
          className="map border border-none"
          width="100%"
          height="500px"
          ref={(node) => setNode(node)}
        ></svg>
      </div>
    </PageWrapper>
  );
};
export default Analytics;
