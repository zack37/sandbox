const { Console } = require('console');
const tinydate = require('tinydate');

const console = new Console({
  stdout: process.stdout,
  stderr: process.stderr,
  colorMode: false,
});

const stamp = tinydate('[{HH}:{mm}:{ss}]');

const baseLog = fn => (...args) => {
  const time = stamp();
  // Ew...
  if (fn === 'dir') {
    process.stdout.write(time + ' ');
    console.dir(...args);
  } else {
    console[fn](time, ...args);
  }
};

const fancy = ['log', 'info', 'dir', 'warn', 'error'].reduce(
  (acc, cur) => ({ ...acc, [cur]: baseLog(cur) }),
  {},
);

fancy.log('log');
fancy.info('info');
fancy.dir([{ a: 1 }]);
fancy.warn('warn');
fancy.error('error');
