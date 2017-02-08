const _ = require('lodash');

const prefixes = [ 'p1', 'p2', 'p3', 'p4', 'p5', 'p6' ];
const geohash = 'g1,g2,g3,g4,g5,g6';

// My way
const myWay = _.flatMap(prefixes, p => geohash.split(',').map(g => p+':'+g));

// The dumb way
const geohashes = geohash.split(',');
let theDumbWay = [];

prefixes.forEach(p => {
  geohashes.forEach(g => {
    theDumbWay.push(p+':'+g);
  });
});

// results
console.log('My way', myWay);
console.log('The dumb way', theDumbWay);
