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
    if (code === 0) {
    } else if (signal) {
    } else {
    }

    if (retries < config.retryCount) {
      config.log('Restarting...');
      return fork(config, retries + 1);
    }

    throw new Error('Restart limit reached');
  });
}

module.exports = config => {
  const configWithDefaults = Object.assign({}, defaults, config);
  if (config.enabled && cluster.isMaster) {
    consoleWithDefaults.log(`Master ${process.pid} is running`);
    return [...Array(configWithDefaults.maxWorkers).keys()].map(() =>
      fork(configWithDefaults)
    );
  }
  return configWithDefaults.onSpawn();
};
