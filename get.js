const get = (...args) => {
  const [path, obj] = args;
  if (args.length === 0) {
    return get;
  }
  if (args.length === 1) {
    return o => get(path, o);
  }

  return path.split('.').reduce((acc, cur) => acc && acc[cur], obj);
};

const getOr = (...args) => {
  const [path, defaultValue, obj] = args;
  if (args.length === 0) {
    return getOr;
  }
  if (args.length === 1) {
    return (d, o) => getOr(path, d, o);
  }
  if (args.length === 2) {
    return o => getOr(path, defaultValue, o);
  }

  return get(path, obj) || defaultValue;
};

// non curried non fp
const getShortCircuit = (path, obj, defaultValue = undefined) => {
  let acc = obj;
  let loopCount = 0;

  if (!obj) {
    return defaultValue;
  }

  for (const prop of path.split('.')) {
    loopCount++;
    acc = acc[prop];
    if (acc === null || acc === undefined) {
      console.log('loopCount', loopCount);
      return defaultValue;
    }
  }

  console.log('loopCount', loopCount);
  return acc;
};

console.group('get');

console.log('full', get('a.b.c', { a: { b: { c: 1 } } }));
console.log('-c', get('a.b.c', { a: { b: {} } }));
console.log('-b', get('a.b.c', { a: {} }));
console.log('-a', get('a.b.c', {}));
console.log('none', get('a.b.c'));

console.groupEnd('get');

console.group('getOr');

console.log('full', getOr('a.b.c', 'default', { a: { b: { c: 1 } } }));
console.log('-c', getOr('a.b.c', 'default', { a: { b: {} } }));
console.log('-b', getOr('a.b.c', 'default', { a: {} }));
console.log('-a', getOr('a.b.c', 'default', {}));
console.log('none', getOr('a.b.c', 'default', undefined));

console.groupEnd('getOr');

console.group('getShortCircuit');

console.log('full', getShortCircuit('a.b.c', { a: { b: { c: 1 } } }));
console.log('-c', getShortCircuit('a.b.c', { a: { b: {} } }));
console.log('-b', getShortCircuit('a.b.c', { a: {} }));
console.log('-a', getShortCircuit('a.b.c', {}));

console.groupEnd('getShortCircuit');
