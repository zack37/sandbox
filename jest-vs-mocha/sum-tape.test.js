const test = require('tape');

const sum = require('.');

test('should sum 1 + 2', t => {
  t.equal(sum(1, 2), 3);
  t.end();
});

test('should fail sum 1 + 2', t => {
  t.equal(sum(1, 2), 4);
  t.end();
});
