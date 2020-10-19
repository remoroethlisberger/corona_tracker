import React, { useMemo } from 'react';
import PageWrapper from '../elements/PageWrapper/PageWrapper';
import { Chart } from "react-charts";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import casesbyday from '../assets/data/dailycases_pull.json'
import { isMobile } from 'mobile-device-detect'

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
  timeFormat,
  mouse,
  bisector,
  bisect
} from 'd3';
import { useEffect } from 'react';

const Analytics = (props) => {

  const { t } = useTranslation();
  const [tooltip, setTooltip] = useState()
  const [node, setNode] = useState();
  const { i18n } = useTranslation();

  const width = isMobile ? document.getElementById('map-container')?.getBoundingClientRect().width - 50 : 600
  const x = scaleBand().domain(casesbyday.map(c => { return new Date(c.primary) })).rangeRound([0, width]).paddingInner(0.2)
  const cx = scaleBand().domain(casesbyday.map(c => { return new Date(c.primary) })).rangeRound([0, width]).paddingInner(0.2)
  const y = scaleLinear().domain([0, Math.ceil(max(casesbyday, (d) => { return d.secondary }) / 100) * 100]).range([400, 0])

  useEffect(() => {

    if (node) {
      const xAxis = axisBottom().scale(x).tickFormat((_, i) => {
        var options = { weekday: 'short', year: '2-digit', month: 'numeric', day: 'numeric' };
        if ((i + 3) % 7 == 0) {
          return _.toLocaleDateString(i18n.language, options)
        } else {
          return ""
        }
      })

      const yAxis = axisLeft().scale(y)
      const svg = select(node).append('g').classed('graph', true).attr('transform', 'translate(50,20)')
      /*
            select('svg.map').call(
              zoom().on('zoom', () => {
                svg.attr('transform', event.transform)
              })
            );
      */

      const cases = select(node).select('g').selectAll('rect')
        .data(casesbyday);


      let l = line()
        .x(function (d, i) { return cx(new Date(d.primary)) + x.bandwidth() / 2 })
        .y(function (d, i) {
          let sum = 0;
          for (let j = 0; j < 6; j++) {
            sum += casesbyday[i + 7 - j].secondary
          }
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

      // grid
      const grid = select(node).select('g').append('g')
        .attr("class", "grid")
        .style("stroke-width", 0.5)
        .call(axisLeft(y).ticks(5).tickSize(-width).tickFormat(() => { return "" }));

      // plot x axis
      select(node).select('g').append('g')
        .attr("id", "x-axis")
        .attr("transform", "translate(0," + 400 + ")").call(xAxis).selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", "-.55em")
        .attr("transform", "rotate(-90)");

      // plot actual cases
      cases
        .enter()
        .append('rect')
        .style("fill", "steelblue")
        .attr("x", function (d) { return x(new Date(d.primary)); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.secondary); })
        .attr("height", function (d) { return 400 - y(d.secondary); });


      // 7 day average
      const path = select(node).select('g')
        .append('path')
        .attr("id", "line")
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

      // make the dots on the redline
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
            sum += casesbyday[i + 7 - j].secondary
          }
          return y(sum / 7)
        })
        .attr("r", 2)


      const tooltip1 = select(node).select('g').append('text')
      const tooltip2 = select(node).select('g').append('text')
      const tooltip3 = select(node).select('g').append('text')

      var bbox = tooltip1.node().getBBox()
      var padding = 2
      select(node).select('g.graph').insert('rect').attr("x", bbox.x - padding)
        .attr("y", bbox.y - padding)
        .attr("width", bbox.width + (padding * 2))
        .attr("height", bbox.height + (padding * 2))
        .style("fill", "white");


      select(node).select('g').on('mousemove', (d, i, nodes) => {
        let mx = isMobile ? mouse(nodes[i])[0] - 35 : mouse(nodes[i])[0] - 35
        let my = mouse(nodes[i])[1]

        var eachBand = x.step();
        var index = Math.floor((mx / eachBand));
        var gx = x.domain()[index];
        let gy = y(my)

        let mybisect = bisector((d) => d)
        let hx = mybisect.left(casesbyday.map(c => { return new Date(c.primary) }), gx)


        var options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };
        //tooltip1.attr('x', x(new Date(casesbyday[hx].primary))).attr('y', y(casesbyday[hx].secondary))
        //tooltip2.attr('x', x(new Date(casesbyday[hx].primary))).attr('y', y(casesbyday[hx].secondary))
        tooltip1.attr("dx", "1em")
        tooltip2.attr("dx", "1em")
        tooltip3.attr("dx", "1em")
        tooltip1.attr("dy", "1em")
        tooltip2.attr("dy", "2em")
        tooltip3.attr("dy", "3em")
        tooltip1.attr('background', 'white')
        tooltip1.text(t('date') + `: ${new Date(casesbyday[hx].primary).toLocaleDateString(i18n.language, options)}`)
        tooltip2.text(t('today') + `: ${casesbyday[hx].secondary}`)
        if (hx >= 6) {
          let sum = 0;
          for (let i = 0; i < 6; i++) {
            sum += casesbyday[hx - i].secondary
          }

          tooltip3.text(t('7_day_trend') + `: ${Math.floor(sum / 7)}`)
        } else {
          tooltip3.text(t('7_day_trend'))
        }


      })

      /*
            select(node).on('mousemove', (d, i) => {
              const l = path.node().getTotalLength()
              const w = path.node().getBBox().width
              const s = l / w
              const offsetLine = document.getElementById('x-axis').getBoundingClientRect().x
              const offsetSVG = document.getElementsByClassName('map')[0].getBoundingClientRect().x
              const m = mouse(node)
              console.log((m[0] - (offsetLine - offsetSVG)))
              let eachBand = x.step()
              let index = Math.round(((m[0] - (offsetLine - offsetSVG)) / eachBand));
              let val = x.domain()[index - 1];
              if (val)
                setTooltip({
                  date: val
                })
            })
      */

      cases.exit().remove();
    }
  }, [node]);


  return (
    <PageWrapper {...props}>
      <div className="text-center">
      </div>
      {props.children}
      <h2 className="text-center">COVID-19 Tracker</h2>
      <div
        id="map-container"
        className="mx-auto map-container text-center"
        style={{
          height: '500px',
          overflow: 'hidden',
          maxWidth: isMobile ? window.innerWidth : 650,
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
