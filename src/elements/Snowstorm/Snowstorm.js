import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { select } from 'd3';

import { randomContaigous, randomOffset } from './helpers';

const Snowstorm = (props) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState([
    {
      offset: { x: randomOffset('x'), y: randomOffset('y') },
      id: 1,
      t: 0,
      r: randomContaigous(),
    },
  ]);

  const createFlakes = () => {
    select('div.root')
      .data(data)
      .enter()
      .append('div')
      .attr('id', 'flake')
      .style('position', 'absolute')
      .style('left', () => {
        return randomOffset('x') + 'px';
      })
      .style('top', () => {
        return randomOffset('y') + 'px';
      })
      .html('🦠');
  };

  useEffect(() => {
    createFlakes();
  }, [data]);

  const enterNewData = (data, step) => {
    let i = step;
    let newdata = [...data];

    console.log(newdata);
    for (let spreader of data.filter((person) => {
      return person.t == i;
    })) {
      let n = spreader.r;
      for (let k = 0; k < n; k++) {
        newdata.push({
          offset: { x: randomOffset('x'), y: randomOffset('y') },
          id: spreader.id + '' + k,
          t: i + 1,
          r: randomContaigous(),
        });
      }
    }
    return newdata;
  };
  useEffect(() => {
    const interval = setInterval(() => {
      let data_ = data;
      let step_ = step;
      if (data.length <= 800) {
        let newdata = enterNewData(data_, step_);
        console.log(newdata);
        setStep(step_ + 1);
        setData(newdata);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [data]);

  return <></>;
};

export default Snowstorm;
