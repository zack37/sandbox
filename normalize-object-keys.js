const camelCase = require('lodash/camelCase');
const isPlainObject = require('lodash/isPlainObject');

function normalizeObjectKeys(obj) {
  if (!isPlainObject(obj) && !Array.isArray(obj)) {
    return obj;
  }

  return Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [camelCase(key)]: isPlainObject(value)
        ? normalizeObjectKeys(value)
        : Array.isArray(value)
          ? value.map(normalizeObjectKeys)
          : value,
    }),
    {},
  );
}

const body = {
  _source: [
    'PRICE_PER_KWH_MIN',
    'EPC_RATE',
    'SUN_HOUR_MIN',
    'SUN_HOUR_MAX_EXCLUSIVE',
  ],
  filter: {
    bool: {
      must: [
        {
          term: {
            DEALER: 'dealer',
          },
        },
        {
          term: {
            CONTRACT_TYPE: 'contractType',
          },
        },
        {
          term: {
            UTILITY_COMPANY: 'utility',
          },
        },
        {
          range: {
            SUN_HOUR_MIN: {
              lte: 'sunHours',
            },
          },
        },
        {
          range: {
            SUN_HOUR_MAX_EXCLUSIVE: {
              gt: 'sunHours',
            },
          },
        },
      ],
    },
  },
};

const normalized = normalizeObjectKeys(body);
const normString = JSON.stringify(normalized);
console.log(normString);
