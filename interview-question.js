'use strict';

r = 'x';
var x = 'm';
var y = 'q';
function f() {
  var x = 'test';
  r = 'z';
}
f();
console.log(r + x + y);
