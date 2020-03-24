function intToFloat(value) {
  return value / 2 ** 64;
}

function getNodeRandomValue() {
  const crypto = require('crypto');
  const buffer = crypto.randomBytes(8);

  return intToFloat(Number.parseInt(buffer.toString('hex'), 16));
}

function getBrowserRandomValue() {
  const crypto = window.crypto || window.msCrypto;
  const randomValues = new Uint32Array(1);

  crypto.getRandomValues(randomValues);

  return intToFloat(randomValues[0]);
}

const range = gen => (max, min) => Math.floor(gen() * (max - min) + min);

const cryptoValue = () =>
  typeof window !== 'undefined' && (window.crypto || window.msCrypto)
    ? getBrowserRandomValue()
    : getNodeRandomValue();

const cryptoRange = range(cryptoValue);

const randomValue = () => Math.random();
const randomRange = range(randomValue);

module.exports = {
  crypto: {
    range: cryptoRange,
    value: cryptoValue,
  },
  value: randomValue,
  range: randomRange,
};
