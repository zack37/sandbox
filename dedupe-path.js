const path = require('path');

const seen = {};

const newEnvPath = process.env.PATH
  .split(path.delimiter)
  .map(p => seen[p] ? '' : (seen[p] = true, p))
  .filter(p => p !== '')
  .join(path.delimiter);

console.log(process.env.PATH);
console.log(process.env.PATH.split(path.delimiter).length);
console.log(newEnvPath);
console.log(newEnvPath.split(path.delimiter).length);

process.env.PATH = newEnvPath;
