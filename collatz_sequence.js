'use strict';

const _ = require('lodash');
 
const modifier = n => n%2===0 ? n/2 : 3*n+1;

const collatzInner = (n) => {
  const sequence = [];
  let i = n;
  while(i > 1) {
    sequence.push(i);
    i = modifier(i);
  }
  sequence.push(i);
  return sequence;
}

const longestSequence = _.maxBy(
    [...Array(1000000).keys()].map(collatzInner),
    x => x.length
);

console.log('Longest Sequence starting number', longestSequence[0]);