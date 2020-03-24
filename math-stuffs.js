const maths = source => {
  let min = Number.MAX_VALUE,
    max = Number.MIN_VALUE,
    sum = 0;

  for (const item of source) {
    if (item < min) {
      min = item;
    }
    if (item > max) {
      max = item;
    }
    sum += item;
  }

  return {
    min,
    max,
    mean: sum / source.length,
    range: max - min,
  };
};

console.log(maths([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
