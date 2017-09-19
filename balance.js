const cluster = require('cluster');
const os = require('os');

const defaults = {
  enabled: true,
  maxWorkers: os.cpus().length,
  retryCount: 10,
  onSpawn: () => {},
  log: console.log.bind(console)
};

function fork(config, retries = 0) {
  const worker = cluster.fork();

  worker.on('exit', (code, signal) => {
    if (signal) {
      config.log(`Worker ${worker.pid} exited due to signal: ${signal}`);
    }
    else if (code !== 0) {
      config.log(`Worker ${worker.pid} exited with code: ${code}`);
    }
    else {
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

function forkAsync(config, retries = 0) {
  return new Promise((resolve, reject) => {
    const worker = cluster.fork();

    worker.on('exit', (code, signal) => {
      if (signal) {
        config.log(`Worker ${worker.pid} exited due to signal: ${signal}`);
      }
      else if (code !== 0) {
        config.log(`Worker ${worker.pid} exited with code: ${code}`);
      }
      else {
        // Worker was exited normally, `return` to avoid restarting process
        config.log(`Worker ${worker.pid} exited successfully`);
        return resolve();
      }

      if (retries < config.retryCount) {
        config.log('Restarting...');
        return fork(config, retries + 1);
      }

      return reject('Restart limit reached');
    });
  });
}

module.exports.balance = config => {
  const configWithDefaults = Object.assign({}, defaults, config);
  if (configWithDefaults.enabled && cluster.isMaster) {
    configWithDefaults.log(`Master ${process.pid} is running`);
    return [...Array(configWithDefaults.maxWorkers).keys()].forEach(() => {
      fork(configWithDefaults);
      configWithDefaults.onSpawn();
    });
  }
  return configWithDefaults.onSpawn();
};

module.exports.balanceAsync = config => {
  return Promise.resolve().then(() => {
    const configWithDefaults = Object.assign({}, defaults, config);
    if (configWithDefaults.enabled && cluster.isMaster) {
      configWithDefaults.log(`Master ${process.pid} is running`);
      return Promise.all(
        [...Array(configWithDefaults.maxWorkers).keys()].forEach(() => {
          return forkAsync(configWithDefaults).then(() =>
            configWithDefaults.onSpawn()
          );
        })
      );
    }
    return configWithDefaults.onSpawn();
  });
};
