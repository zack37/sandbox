function isLeapYear(year) {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

function averageYearLength(startYear = 0, endYear = new Date().getFullYear()) {
  if (startYear > endYear) {
    [startYear, endYear] = [endYear, startYear];
  }
  const years = Array.from(
    { length: endYear - startYear },
    (_, i) => startYear + i,
  );
  const sum = years
    .map(year => (isLeapYear(year) ? 366 : 365))
    .reduce((acc, cur) => acc + cur);

  return sum / years.length;
}

function getAge(dateString, currentDate = new Date()) {
  const birthday = new Date(dateString);
  const msInYear = 1000 * 60 * 60 * 24 * 365.2425;

  return ~~((Number(currentDate) - Number(birthday)) / msInYear);
}

console.log(getAge('1992-06-28', new Date('2018-04-05'))); // 25
console.log(getAge('1992-04-04', new Date('2018-04-05'))); // 26
console.log(getAge('1992-04-05', new Date('2018-04-05'))); // 26
console.log(getAge('1992-04-06', new Date('2018-04-05'))); // 25

console.log('averageYearLength', averageYearLength(0, 2000));
