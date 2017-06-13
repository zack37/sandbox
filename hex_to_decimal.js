const hexMap = {
  a: '10',
  b: '11',
  c: '12',
  d: '13',
  e: '14',
  f: '15'
};

const convert = n => {
  return n.split('').reverse().reduce((acc, cur, i) => {
    const decValue = parseInt(hexMap[cur.toLowerCase()] || cur, 10);
    return acc + decValue * Math.pow(16, i);
  }, 0);
};

const input = process.argv[2];

console.log(`${input} converted to decimal is ${convert(input)}`);
console.log(`but with cheating, ${input} is ${parseInt(input, 16)}`);
