const weekdayMap = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function calculateDoomsday(year) {
  return ((2 + year + year / 4 - year / 100 + year / 400) << 0) % 7;
}

console.log(weekdayMap[calculateDoomsday(1985)]);
