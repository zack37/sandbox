const { Observable } = require('rxjs/Rx');
const { createInterface } = require('readline');
const { createReadStream } = require('fs');
const { redBright } = require('chalk');

const format = globalPattern => ({ line, text }) => {
  return `${line}: ${text.replace(globalPattern, m => redBright(m))}`;
};

function grep(pattern, file) {
  if (!(pattern instanceof RegExp)) {
    pattern = new RegExp(pattern);
  }
  const globalPattern = new RegExp(pattern, pattern.flags + 'g');
  const readStream = createInterface({
    input: createReadStream(file)
  });

  return Observable.fromEvent(readStream, 'line')
    .takeUntil(Observable.fromEvent(readStream, 'close'))
    .map((text, i) => ({ text: text.trim(), line: i + 1 }))
    .filter(({ text }) => pattern.test(text))
    .map(format(globalPattern))
    .toArray()
    .toPromise();
}

function grepObserverless(pattern, file) {
  if (!(pattern instanceof RegExp)) {
    pattern = new RegExp(pattern);
  }
  const globalPattern = new RegExp(pattern, pattern.flags + 'g');
  const readStream = createInterface({
    input: createReadStream(file)
  });

  return new Promise(resolve => {
    const results = [];
    let lineCounter = 0;

    readStream.on('close', () => resolve(results));

    readStream.on('line', text => {
      const toPush = { text: text.trim(), line: ++lineCounter };
      if (pattern.test(toPush.text)) {
        const formatted = format(globalPattern)(toPush);
        results.push(formatted);
      }
    });
  });
}

module.exports = grep;
module.exports.butwhy = grepObserverless;
