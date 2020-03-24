const { Suite } = require('benchmark');
const benchmarkPrint = require('./benchmark-print');

const onComplete = function() {
  const label = `\`${this.name}\` results`;
  console.group(label);
  benchmarkPrint(this);
  console.groupEnd(label);
};

const generateRandomString = (
  length,
  chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
) => {
  return Array.from({ length }, (_, i) => i).reduce(
    acc => acc + chars[Math.floor(Math.random() * chars.length)],
  );
};

const randomString = generateRandomString(1000);
const pattern = /a/i;

new Suite('String#toLowerCase vs RegExp#test', {
  onComplete,
  onError: console.error,
})
  .add('toLowercase()', () => {
    return randomString.toLowerCase() === 'a';
  })
  .add('regexp test()', () => {
    return pattern.test(randomString);
  })
  .run();
