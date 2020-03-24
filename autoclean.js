//? This doesn't work as well as yarn autoclean (duh).
const { createReadStream, promises: fs } = require('fs');
const path = require('path');
const readline = require('readline');
const { fromEvent } = require('rxjs');
const { filter, map, mergeMap, takeUntil, toArray } = require('rxjs/operators');
const glob = require('fast-glob');

const rl = readline.createInterface({
  input: createReadStream('.yarnclean'),
});
const cwd = path.resolve(path.join(__dirname, 'node_modules'));

fromEvent(rl, 'line')
  .pipe(
    takeUntil(fromEvent(rl, 'close')),
    filter(x => x && !x.startsWith('#')),
    map(x => `**/${x}`),
    toArray(),
    mergeMap(patterns => {
      const stream = glob.stream(patterns, { deep: true, cwd });
      return fromEvent(stream, 'data').pipe(
        takeUntil(fromEvent(stream, 'end')),
      );
    }),
    mergeMap(p => fs.unlink(path.join(cwd, p))),
  )
  .subscribe({
    next: x => console.log('Removed:', x),
    error: e => console.error(e),
    complete: () => console.log('done'),
  });
