const { Observable } = require('rxjs');
const { createInterface } = require('readline');
const { createReadStream } = require('fs');
const { blue, greenBright, redBright } = require('chalk');

const format = globalPattern => ({ line, text }) =>
  `${greenBright(line)}:${text.replace(globalPattern, m => redBright.bold(m))}`;

function grep$(pattern, inStream) {
  const readStream = createInterface({ input: inStream });

  return Observable.fromEvent(readStream, 'line')
    .takeUntil(Observable.fromEvent(readStream, 'close'))
    .map((text, i) => ({ text, line: i + 1 }))
    .filter(({ text }) => pattern.test(text));
}

function grepAsync(pattern, inStream) {
  const readStream = createInterface({ input: inStream });

  return new Promise(resolve => {
    const results = [];
    let lineCounter = 0;

    readStream.on('close', () => resolve(results));

    readStream.on('line', text => {
      lineCounter++;
      if (pattern.test(text)) {
        const textWithLine = { text, line: lineCounter };
        results.push(textWithLine);
      }
    });
  });
}

module.exports = grep$;
module.exports.grepAsync = grepAsync;

const patternRegex = /dolor/;
const globalPattern = /dolor/g;

grepAsync(patternRegex, createReadStream('./big.file.txt'))
  .then(results => results.map(format(globalPattern)))
  .then(formatted => formatted.forEach(x => console.log(blue('promise'), x)))
  .then(() => console.log('\n\n\n'));

grep$(patternRegex, createReadStream('./big.file.txt'))
  .map(format(globalPattern))
  .subscribe(
    value => console.log(blue('rx'), value),
    err => console.error(err),
    () => console.log('\n\n\n')
  );
