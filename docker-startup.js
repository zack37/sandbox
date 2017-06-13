const Docker = require('dockerode');
const { stat } = require('fs');
const Promise = require('bluebird');

const statAsync = Promise.promisify(stat);
const socketPath = process.env.DOCKER_SOCKET || '/var/run/docker.sock';

const log = console.log.bind(console);

const checkSocket = () =>
  statAsync(socketPath).then(stats => {
    if (!stats.isSocket()) {
      throw new Error('Are you sure docker is running?');
    }
  });
const containerNotRunning = ({ container }) =>
  container.inspect().then(ci => !ci.State.Running);
const startLog = ({ name, container }) =>
  container.start().then(() => log(`Container ${name} started`));

const startContainers = containerNames => {
  const docker = new Docker({ socketPath, Promise });
  return Promise.map(containerNames, cn => ({
    name: cn,
    container: docker.getContainer(cn)
  }))
    .filter(containerNotRunning)
    .map(startLog);
};

module.exports = checkSocket().then(() =>
  startContainers(['couchdb', 'mariadb', 'mongodb', 'redis']).catch(err => {
    console.error(err);
    process.exitCode = 1;
  })
);
