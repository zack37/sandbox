const cluster = require('cluster');
const os = require('os');

const defaults = {
  enabled: true,
  maxWorkers: os.cpus().length,
  retryCount: 10,
  onSpawn: () => {},
  log: console.log.bind(console),
};

function fork(config, retries = 0) {
  const worker = cluster.fork();

  worker.on('exit', (code, signal) => {
    if (signal) {
      config.log(`Worker ${worker.pid} exited due to signal: ${signal}`);
      // eslint-disable-next-line no-negated-condition
    } else if (code !== 0) {
      config.log(`Worker ${worker.pid} exited with code: ${code}`);
    } else {
      // Worker was exited normally, `return` to avoid restarting process
      return config.log(`Worker ${worker.pid} exited successfully`);
    }

    if (retries < config.retryCount) {
      config.log('Restarting...');
      return fork(config, retries + 1);
    }

    throw new Error('Restart limit reached');
  });
}

async function forkAsync(config, retries = 0) {
  return new Promise((resolve, reject) => {
    const worker = cluster.fork();

    worker.on('exit', (code, signal) => {
      if (signal) {
        config.log(`Worker ${worker.pid} exited due to signal: ${signal}`);
        // eslint-disable-next-line no-negated-condition
      } else if (code !== 0) {
        config.log(`Worker ${worker.pid} exited with code: ${code}`);
      } else {
        // Worker was exited normally, `return` to avoid restarting process
        config.log(`Worker ${worker.pid} exited successfully`);
        return resolve();
      }

      if (retries < config.retryCount) {
        config.log('Restarting...');
        return fork(config, retries + 1);
      }

      return reject(new Error('Restart limit reached'));
    });
  });
}

module.exports.balance = cfg => {
  const config = Object.assign({}, defaults, cfg);
  if (config.enabled && cluster.isMaster) {
    config.log(`Master ${process.pid} is running`);
    return [...new Array(config.maxWorkers).keys()].forEach(() => {
      fork(config);
      config.onSpawn();
    });
  }
  return config.onSpawn();
};

module.exports.balanceAsync = async cfg => {
  const config = { ...defaults, ...cfg };
  if (config.enabled && cluster.isMaster) {
    config.log(`Master ${process.pid} is running`);
    return Promise.all([...new Array(config.maxWorkers).keys()]).map(
      async () => {
        await forkAsync(config);
        config.onSpawn();
      },
    );
  }
  return config.onSpawn();
};
