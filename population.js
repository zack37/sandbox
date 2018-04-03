const { Observable } = require('rxjs');

const INITIAL_POPULATION = 0.001;
const STEP_SIZE = 5;
const YEARS = 10;

Array.prototype.scan = function(accum, initial) {
  return arguments.length > 1
    ? this.mapScan(null, accum, initial)
    : this.mapScan(null, accum);
};

Array.prototype.mapScan = function(project, accum, initial) {
  let source = this;
  let init = initial;

  if (arguments.length < 3) {
    [init, ...source] = this;
  }
  const result = [];
  let acc = init;

  for (var i = 0; i < source.length; i++) {
    const projection = project ? project(acc, i) : acc;
    result.push(projection);
    acc = accum(acc, source[i]);
  }

  return result;
};

const stepGenerator = i => {
  return Observable.range(0, STEP_SIZE).map(x => i + x / STEP_SIZE);
};

const populationFormula = (lambda, xn = INITIAL_POPULATION) => {
  return lambda * xn * (1 - xn);
};

const growth = (lambda, years) => {
  return [...Array(years).keys()].mapScan(
    (population, year) => ({ year, population }),
    acc => populationFormula(lambda, acc),
    INITIAL_POPULATION
  );
};

Observable.range(0, 4)
  .flatMap(stepGenerator)
  .skip(1)
  .map(lambda => ({ lambda, growth: growth(lambda, YEARS) }))
  .subscribe(console.log);
