import { feature } from 'topojson-client';

export const getCasesById = (geo, data) => {
  let casesById = [];
  const features = geo.features;
  for (let feature of features) {
    let id = feature.id;
    let cases = data.filter((cases) => {
      return cases.id == id;
    });
    casesById.push({ id: id, cases: cases });
  }
  return casesById;
};

export const parseDates = (data) => {
  for (let i = 0; i < data.length; i++) {
    data[i].date = new Date(data[i].date);
  }
  return data;
};

export const getMinDate = (data) => {
  let minDate = undefined;
  for (const datapoint of data) {
    if (!minDate) minDate = datapoint.date;
    if (datapoint.date <= minDate) minDate = datapoint.date;
  }

  minDate.setDate(minDate.getDate() + 10);
  return minDate;
};

export const getMaxDate = (data) => {
  let maxDate = undefined;
  for (const datapoint of data) {
    if (!maxDate) maxDate = datapoint.date;
    if (datapoint.date >= maxDate) maxDate = datapoint.date;
  }
  return maxDate;
};
