const { values, find } = require('ramda');
const { inspect } = require('util');

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
  return (find(
    x => x.stringLevel === level || x.intLevel === level,
    values(logLevels)
  ) || logLevels.info).log;
};

const wtf = level => message => {
  switch (level.toString().toLowerCase()) {
  case 'fatal':
  case 'error':
  case '60':
  case '50':
    console.log('ERROR', message);
    break;
  case 'warn':
  case '40':
    console.log('WARN', message);
    break;
  case 'info':
  case '30':
    console.log('INFO', message);
    break;
  case 'debug':
  case '20':
    console.log('DEBUG', message);
    break;
  case 'trace':
  case '10':
    console.log('TRACE', message);
    break;
  default:
    console.log('INFO', message);
    break;
  }
};

const stripWhitespace = thing => thing.toString().replace(/^\s+/g, '');

console.log('wtf length', stripWhitespace(wtf).length);
console.log(
  'sane length',
  stripWhitespace(sane).length +
    stripWhitespace(inspect(logLevels, { breakLength: Infinity })).length +
    stripWhitespace(bound).length
);
wtf(60)('stupid');
wtf('fatal')('stupid');
sane(60)('sane');
sane('fatal')('sane');
