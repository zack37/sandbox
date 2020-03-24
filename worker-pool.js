const Promise = require('bluebird');
const { EventEmitter } = require('events');

const emitter = new EventEmitter();

class Worker {
  constructor(fn, emitter) {
    this.fn = fn;
    this.emitter = emitter;
  }

  work(args = [], context = null, fn = this.fn) {
    if (arguments.length === 2 && !this.fn) {
      fn = context;
      context = null;
    }
    return Promise.resolve()
      .then(() => fn.apply(context, args))
      .then(result => {
        this.emitter.emit('worker:done', this);
        return result;
      })
      .catch(err => {
        this.emitter.emit('worker:done', this);
        return err;
      });
  }
}

class SingleFuncWorkerPool {
  constructor(count, fn) {
    this.workers = [...new Array(count).keys()].map(
      () => new Worker(fn, emitter),
    );
  }

  getWorker() {
    return new Promise(resolve => {
      if (this.workers.length) {
        return resolve(this.workers);
      }
      const wait = worker => {
        this.workers.push(worker);
        emitter.removeListener('worker:done', wait);
        resolve(this.workers);
      };
      emitter.on('worker:done', wait);
    }).then(workers => workers.pop());
    // Return Promise
    //   .resolve()
    //   // .timeout(5000)
    //   .then(() => {
    //     if(this.workers.length === 0) {
    //       return new Promise((resolve) => {
    //         const wait = (worker) => {
    //           this.workers.push(worker);
    //           emitter.removeListener('worker:done', wait);
    //           return resolve(this.workers.pop());
    //         };
    //         emitter.on('worker:done', wait);
    //       });
    //     /* wait for a worker to become available */
    //     }
    //     return this.workers.pop();
  }
}

class MultiFuncWorkerPool {
  constructor(count) {}
}

module.exports = (count, fn) => {
  return fn
    ? new SingleFuncWorkerPool(count, fn)
    : new MultiFuncWorkerPool(count);
};

const w = module.exports(5, () => {
  return new Promise(resolve => {
    console.log('beginning work');
    setTimeout(() => {
      console.log('done working');
      resolve();
    }, 1000);
  });
});
Promise.map([...new Array(100).keys()], () => {
  return w.getWorker().then(worker => worker.work());
});
