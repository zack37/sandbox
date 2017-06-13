const util = require('util');

const myConsole = function(stdout, stderr) {
  const ctx = {
    stdout,
    stderr,
    times: new Map()
  };

  let instance = {
    log: (...args) => ctx.stdout.write(util.format.apply(ctx, args) + '\n'),
    warn: (...args) => ctx.stderr.write(util.format.apply(ctx, args) + '\n'),
    dir: (obj, opts) => {
      ctx.stdout.write(
        util.inspect(obj, util._extend({ customeInspect: false }, opts)) + '\n'
      );
    },
    time: label => ctx.times.set(label, Date.now()),
    timeEnd: label => {
      const time = ctx.times.get(label);

      if (!time) {
        throw new Error(`No such label: ${label}`);
      }
      const duration = Date.now() - time;
      instance.log(`${label}: ${duration}ms`);
    },
    trace: () => {
      const err = new Error();
      err.name = 'Trace';
      err.message = util.format.apply(ctx, arguments);
      Error.captureStackTrace(err, instance.trace);
      instance.error(err.stack);
    },
    assert: (expression, ...args) => {
      if (!expression) {
        require('assert').ok(false, util.format.apply(ctx, args));
      }
    }
  };

  instance.info = instance.log;
  instance.error = instance.warn;

  return instance;
};

const myc = (module.exports = myConsole(process.stdout, process.stderr));
module.exports;
module.exports.myConsole = myConsole;

myc.log('my console works great');
myc.time('My time');
myc.timeEnd('My time');
