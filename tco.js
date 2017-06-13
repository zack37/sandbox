function tco(n, acc = 0) {
  if (n <= 0) {
    return acc;
  }
  return tco(n - 1, acc + 1);
}

console.log(tco(100));
console.log(tco(1000));
console.log(tco(10000));
console.log(tco(100000));
console.log(tco(1000000));
console.log(tco(10000000));
console.log(tco(100000000));
console.log(tco(1000000000));
