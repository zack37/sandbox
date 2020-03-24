function dualify(callback, promise) {
  return !callback
    ? promise
    : promise.then(callback.bind(null, null)).catch(callback);
}

function dualifyTick(callback, promise) {
  return !callback
    ? promise
    : promise
        .then(res => process.nextTick(() => callback(null, res)))
        .catch(err => process.nextTick(() => callback(err)));
}

const longPromiseSuccess = value => {
  return new Promise(resolve => {
    setTimeout(() => resolve(value), 2000);
  });
};

const longPromiseError = err => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(err), 2000);
  });
};

dualifyTick(null, longPromiseSuccess(5)).then(
  console.log.bind(console, 'dualifyTick promise resolve'),
);
dualifyTick(null, longPromiseError('Oops')).catch(
  console.log.bind(console, 'dualifyTick promise reject'),
);
dualifyTick(
  console.log.bind(console, 'dualifyTick callback success'),
  longPromiseSuccess(5),
);
dualifyTick(
  console.log.bind(console, 'dualifyTick callback error'),
  longPromiseError('Oops'),
);

dualify(null, longPromiseSuccess(5)).then(
  console.log.bind(console, 'dualify promise resolve'),
);
dualify(null, longPromiseError('Oops')).catch(
  console.log.bind(console, 'dualify promise reject'),
);
dualify(
  console.log.bind(console, 'dualify callback success'),
  longPromiseSuccess(5),
);
dualify(
  console.log.bind(console, 'dualify callback error'),
  longPromiseError('Oops'),
);
