const { DateTime } = require('luxon');

const test = DateTime.fromFormat('08-13-2013', 'MM-DD-YYYY');

// Console.log(test);
// console.log(test.minus({ month: 1 }));
// console.log(DateTime.local());

function clamp(date) {
  const now = DateTime.utc();
  return date.toUTC() > now ? now : date;
}

console.log(test.diffNow(['years', 'months', 'days']));
