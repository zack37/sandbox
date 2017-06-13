const R = require('ramda');
const util = require('util');

const bound = l => console.log.bind(console, l);

const logLevels = {
  fatal: { stringLevel: 'fatal', intLevel: 60, log: bound('ERROR') },
  error: { stringLevel: 'error', intLevel: 50, log: bound('ERROR') },
  warn: { stringLevel: 'warn', intLevel: 40, log: bound('WARN') },
  info: { stringLevel: 'info', intLevel: 30, log: bound('INFO') },
  debug: { stringLevel: 'debug', intLevel: 20, log: bound('DEBUG') },
  trace: { stringLevel: 'trace', intLevel: 10, log: bound('TRACE') }
};

const sane = level => {
  return (R.keys(logLevels)
    .map(x => logLevels[x])
    .find(x => x.stringLevel === level || x.intLevel === level) ||
    logLevels.info).log;
};

const wtf = level => message => {
  if (typeof level === 'string') {
    switch (level.toLowerCase()) {
      case 'fatal':
      case 'error':
        console.log('ERROR', message);
        break;
      case 'warn':
        console.log('WARN', message);
        break;
      case 'info':
        console.log('INFO', message);
        break;
      case 'debug':
        console.log('DEBUG', message);
        break;
      case 'trace':
        console.log('TRACE', message);
        break;
      default:
        console.log('INFO', message);
        break;
    }
  } else if (typeof level === 'number') {
    switch (level) {
      case 60:
      case 50:
        console.log('ERROR', message);
        break;
      case 40:
        console.log('WARN', message);
        break;
      case 30:
        console.log('INFO', message);
        break;
      case 20:
        console.log('DEBUG', message);
        break;
      case 10:
        console.log('TRACE', message);
        break;
      default:
        console.log('INFO', message);
        break;
    }
  } else {
    console.log('INFO', message);
  }
};

console.log('wtf length', wtf.toString().length);
console.log(
  'sane length',
  sane.toString().length +
    util.inspect(logLevels).length +
    bound.toString().length
);
wtf(60)('stupid');
wtf('fatal')('stupid');
sane(60)('sane');
sane('fatal')('sane');
