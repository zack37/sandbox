const { Suite } = require('benchmark');
const benchmarkPrint = require('./benchmark-print');

const testString =
  'This0is1a2much3much4longer5string6that7will8have9a0character10at11the12end13that14will15not16pass17the18validation';

const alphanumCheck = char =>
  (char > 47 && char < 58) ||
  (char > 64 && char < 91) ||
  (char > 96 && char < 123);

function forCharCodeAt(str) {
  let code,
    i,
    len = str.length;

  for (i = 0; i < len; i++) {
    code = str.charCodeAt(i);
    if (!alphanumCheck(code)) {
      return false;
    }
  }
  return true;
}

function forCharCode(str) {
  let code,
    i,
    len = str.length;

  for (i = 0; i < len; i++) {
    code = str[i].charCode;
    if (!alphanumCheck(code)) {
      return false;
    }
  }

  return true;
}

function forIn(str) {
  for (const code of str) {
    if (!alphanumCheck(code)) {
      return false;
    }
  }

  return true;
}

const ALPHANUM_PATTERN = /^[0-9A-Za-z]+$/;
function regex(str) {
  return ALPHANUM_PATTERN.test(str);
}

function everyCharCodeAt(str) {
  return str.split('').every(s => alphanumCheck(s.charCodeAt(0)));
}

function everyCharCode(str) {
  return str.split('').every(s => alphanumCheck(s.charCode));
}

new Suite('is-alphanumeric')
  .add('for charCodeAt()', () => {
    return forCharCodeAt(testString);
  })
  .add('for charCode', () => {
    return forCharCode(testString);
  })
  .add('regexp', () => {
    return regex(testString);
  })
  .add('forin', () => {
    return forIn(testString);
  })
  .add('every charCodeAt()', () => {
    return everyCharCodeAt(testString);
  })
  .add('every charCode', () => {
    return everyCharCode(testString);
  })
  .on('complete', benchmarkPrint)
  .run();
