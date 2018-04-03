const flatMap = require('lodash/flatMap');
const map = require('lodash/map');

const data = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }, { a: 7, b: 8, d: 9 }];

const headers = [...new Set(flatMap(data, Object.keys))];
const rows = map(data, d => map(headers, h => d[h] || ''));

console.log(headers.join(','));
console.log(map(rows, r => r.join(',')).join('\n'));
