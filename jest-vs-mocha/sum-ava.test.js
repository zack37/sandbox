const sum = require('./');
const test = require('ava');

test('should sum 1 + 2', t => {
  const one = 1;
  const two = 2;
  const three = 3;
  t.is(sum(one, two), three);
});

test('should fail sum 1 + 2', t => {
  const one = 1;
  const two = 2;
  const four = 4;
  t.is(sum(one, two), four);
});
