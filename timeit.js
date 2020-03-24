const timeit = (name, fn, ...args) => {
  return Promise.resolve()
    .then(() => {
      const start = process.hrtime();
      const result = fn(...args);

      if (result && typeof result.then === 'function') {
        return result.then(x => {
          const end = process.hrtime(start);
          return { result: x, end };
        });
      }

      const end = process.hrtime(start);
      return { result, end };
    })
    .then(({ result, end: [seconds, nanoseconds] }) => {
      const secondsMS = seconds * 1000;
      const nanosecondsMS = nanoseconds / 1e6;

      console.log(`Operation "${name}" took ${secondsMS + nanosecondsMS} ms`);

      return result;
    });
};

module.exports = timeit;
