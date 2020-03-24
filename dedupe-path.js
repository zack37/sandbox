const path = require('path');

const newEnvPath = [...new Set(process.env.PATH.split(path.delimiter))].join(
  path.delimiter,
);

console.log(process.env.PATH);
console.log(process.env.PATH.split(path.delimiter).length);
console.log(newEnvPath);
console.log(newEnvPath.split(path.delimiter).length);

process.env.PATH = newEnvPath;
