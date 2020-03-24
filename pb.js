const os = require('os');
const pb = require('pretty-bytes');

const total = os.totalmem(),
  freemem = os.freemem(),
  usage = total - freemem,
  percentage = (usage / total) * 100;

console.log('free memory', pb(freemem));
console.log('total memory', pb(total));
console.log('usage', pb(usage));
console.log('percentage', percentage.toPrecision(4) + '%');
