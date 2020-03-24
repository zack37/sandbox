let cache = [1];

function digitSum(value, sum = 0) {
  if (value <= 0) {
    return sum;
  }
  return digitSum(Math.floor(value / 10), sum + (value % 10));
}

function squareDigitSum(value, sum = 0) {
  if (value <= 0) {
    return sum;
  }
  const d = value % 10;
  return squareDigitSum(Math.floor(value / 10), sum + d * d);
}

const happyNumber = num => {
  function inner(num, prev) {
    if (cache.includes(num)) {
      return true;
    }
    if (num === 1) {
      cache = cache.concat(prev);
      return true;
    }
    if (prev.includes(num)) {
      return false;
    }
    return inner(squareDigitSum(num), prev.concat(num));
  }

  return inner(num, []);
};

const results = [...new Array(1000001).keys()].filter(happyNumber);
console.log(results);
