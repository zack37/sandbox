'use strict';

r = 'x';
const x = 'm';
const y = 'q';
function f() {
  const x = 'test';
  r = 'z';
}
f();
console.log(r + x + y);
