const f = (n, s = '*'.repeat(n)) =>
  n > 1
    ? `${s}
${f(n - 2).replace(/^/gm, ' ')}
${s}`
    : s;

const times = process.argv[2] || 5;

console.log(f(times));
