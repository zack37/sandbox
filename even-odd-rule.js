/*eslint no-unused-vars: off */
const _ = require('lodash');
const { Suite } = require('benchmark');
const path = require('path');
const plot = require('./plot');

const isPointInPath = (point, poly) => {
  const num = poly.length;
  const x = point[0], y = point[1];
  let j = num - 1, c = false;
  for(let i = 0; i < num; i++) {
    if( poly[i][1] > y !== poly[j][1] > y && x < (poly[j][0] - poly[i][0]) * (y - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0] ) {
      c = !c;
    }
    j = i;
  }
  return c;
};

const [ node, file, numberOfEvents, numberOfPoints, precision ] = process.argv;

// const shape = plot(parseInt(numberOfPoints || 50000, 10), parseInt(precision || 10, 10));

// shapeTask.done('Finished generating shape');

const getBoundary = () => [ [ -1.0, -1.0 ], [ -11.0, -1.0 ], [ -11.0, -11.0 ], [ -1.0, -11.0 ], [ -1.0, -1.0 ] ];

// console.log('number of points in shape', shape.length);
// const boundary = getBoundary();

// const timerLabel = `Running point-in-polygon for ${numberOfEvents} events with polygon sized ${numberOfPoints}`;

// const events = [...Array(parseInt(numberOfEvents)).keys()];

const otherBoundary = [ [ -5, 5 ], [ 5, 5 ], [ 5, 1 ], [ -5, 5 ], [ -5, 5 ] ];

console.log('==========', isPointInPath([ 0, 0 ], otherBoundary));


// console.time(timerLabel);

// evenOddTask.status('Begining algorithm').details(`Number of events: ${numberOfEvents} for shape sized ${numberOfPoints}`);

// const results = events.some(() => shape.some(([x, y]) => isPointInPath(x, y, boundary)));

// if(results) {
//   evenOddTask.done('Finished');
// }
// else {
//   evenOddTask.fail('Shape and boundary do not intersect');
// }
// console.log('results', results);

// console.timeEnd(timerLabel);

// console.log(`success? ${results}`);

const suite = new Suite();
const boundary = getBoundary();

// Event Benchmark Setup
const shape = plot(50000, 10);
const e1 = [...Array(1).keys()];
const e10 = [...Array(10).keys()];
const e100 = [...Array(100).keys()];
const e1000 = [...Array(1000).keys()];
const e10000 = [...Array(10000).keys()];

// Point Benchmark Setup
const events = [...Array(50000).keys()];
const p4 = plot(4, 1);
const p20 = plot(20, 10);
const p100 = plot(100, 10);
const p1000 = plot(1000, 10);
const p10000 = plot(10000, 10);

const sumSquaredOddNumbersIterative = (upper) => {
  let sum = 0;
  let ns = 1;
  let i = 1;
  while(ns < 1000) {
    sum += ns;
    i+=2;
    ns = i*i;
  }

  return sum;
}

const sumSquaredOddNumbersFunctional = (upper) => {
  return _(_.range(1, Math.sqrt(upper), 2)).map(x => x*x).takeWhile(x => x < upper).sum();
};

const inner = (i, sum, upper) => {
  const ns = i*i;
  return ns > upper
    ? sum
    : inner(i + 2, sum + ns, upper);
}
const sumSquaredOddNumbersRecursive = upper => inner(1, 0, upper);

console.time('iterative');
const iterative = sumSquaredOddNumbersIterative(1000);
console.timeEnd('iterative');
console.log(iterative);

console.time('functional');
const functional = sumSquaredOddNumbersFunctional(1000);
console.timeEnd('functional');
console.log(functional);

console.time('recursive');
const recursive = sumSquaredOddNumbersRecursive(1000);
console.timeEnd('recursive');
console.log(recursive);

suite
  .add('sum_squared_odd_numbers_iterative', () => {
    return sumSquaredOddNumbersIterative(1000);
  })
  .add('sum_squared_odd_numbers_functional', () => {
    return sumSquaredOddNumbersFunctional(1000);
  })
  .add('sum_squared_odd_numbers_recursive', () => {
    return sumSquaredOddNumbersRecursive(1000);
  })
  .add('benchmark_point_in_polygon_1_event', () => {
    e1.filter(() => shape.some(p => isPointInPath(p, boundary)));
  })
  .add('benchmark_point_in_polygon_10_events', () => {
    e10.filter(() => shape.some(p => isPointInPath(p, boundary)));
  })
  .add('benchmark_point_in_polygon_100_events', () => {
    e100.filter(() => shape.some(p => isPointInPath(p, boundary)));
  })
  .add('benchmark_point_in_polygon_1000_events', () => {
    e1000.filter(() => shape.some(p => isPointInPath(p, boundary)));
  })
  .add('benchmark_point_in_polygon_10000_events', () => {
    e10000.filter(() => shape.some(p => isPointInPath(p, boundary)));
  })
  .add('benchmark_point_in_polygon_4_points', () => {
    events.filter(() => p4.some(p => isPointInPath(p, boundary)))
  })
  .add('benchmark_point_in_polygon_20_points', () => {
    events.filter(() => p20.some(p => isPointInPath(p, boundary)))
  })
  .add('benchmark_point_in_polygon_100_points', () => {
    events.filter(() => p100.some(p => isPointInPath(p, boundary)))
  })
  .add('benchmark_point_in_polygon_1000_points', () => {
    events.filter(() => p1000.some(p => isPointInPath(p, boundary)))
  })
  .add('benchmark_point_in_polygon_10000_points', () => {
    events.filter(() => p10000.some(p => isPointInPath(p, boundary)))
  })
  .on('complete', function() {
    // console.log(this);
    console.log(this.filter('successful').map(({name, stats}) => ({ name, average: stats.mean*1e9 })));
  })
  .run({ async: true });
