const round = n => Math.round(n * 10) / 10;

module.exports = (n, precision) => {
  const eachLength = n / 4;
  const point = [...new Array(eachLength).keys()];
  return [
    ...point.map(x => [round(x / precision), 0.0]),
    ...point.map(x => [
      round((eachLength - 1) / precision),
      round(x / precision),
    ]),
    ...point.map(x => [
      round((eachLength - 1) / precision - x / precision),
      round((eachLength - 1) / precision),
    ]),
    ...point.map(x => [
      0.0,
      round((eachLength - 1) / precision - x / precision),
    ]),
  ];
};
