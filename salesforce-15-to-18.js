const assert = require('assert');
const joi = require('joi');

const idSchema = joi
  .string()
  .alphanum()
  .required()
  .min(15)
  .max(18);

const [, , arg] = process.argv;

const logHrTime = (label, [s, ns]) => {
  console.log(`${label} took ${s * 1e3 + ns / 1e6}ms`);
};

const isUpperCase = char => {
  const charCode = char.codePointAt(0);

  return charCode >= 65 && charCode <= 90;
};

const binaryIdLookup = binaryString =>
  String.fromCharCode(Number.parseInt(binaryString, 2) + 65);

const convert = id => {
  joi.assert(id, idSchema);
  if (id.length === 18) {
    return id;
  }

  const chunks = Array.from({ length: 3 }, (_, i) =>
    id.substr(i * 5, 5).split(''),
  );

  const suffix = chunks
    .map(chunk => {
      const binaryString = chunk
        .reverse()
        .map(c => (isUpperCase(c) ? '1' : '0'))
        .join('');

      return binaryIdLookup(binaryString);
    }, '')
    .join('');

  return id + suffix;
};

const start = process.hrtime();
const result = convert(arg);
logHrTime('Execution Time', process.hrtime(start));
console.log(result);

assert.equal(
  convert('a2x41000001IuPu'),
  'a2x41000001IuPuAAK',
  'Conversion failed',
);
assert.throws(() => convert(''), 'Convert should throw for empty string');
assert.throws(
  () => convert('a2x41000001IuPujb99'),
  'Convert should throw for string longer than 18 characters',
);
assert.equal(
  convert('a2x41000001IuPuAAK'),
  'a2x41000001IuPuAAK',
  'Did not return same result',
);
