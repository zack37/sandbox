const _curry = (f, length, arr) => (...args) => {
  const inner = a => (a.length >= length ? f(...a) : _curry(f, length, a));

  return inner([...arr, ...args]);
};

const curry = (fn, length = fn.length) => _curry(fn, length, []);

const add3 = curry((a, b, c) => a + b + c);

console.log(add3(1, 2, 3));
console.log(add3(1, 2)(3));
console.log(add3(1)(2, 3));
console.log(add3(1)(2)(3));

module.exports = curry;
