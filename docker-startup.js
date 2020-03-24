const Docker = require('dockerode');
const { stat } = require('fs');
const Promise = require('bluebird');

const statAsync = Promise.promisify(stat);
const socketPath = process.env.DOCKER_SOCKET || '/var/run/docker.sock';

const log = console.log.bind(console);

async function checkSocket() {
  const stats = await statAsync(socketPath);
  if (!stats.isSocket()) {
    throw new Error('Are you sure docker is running?');
  }
}
async function containerNotRunning({ container }) {
  const {
    State: { Running },
  } = await container.inspect();
  return !Running;
}
async function startLog({ name, container }) {
  await container.start();
  log(`Container ${name} started`);
}
async function startContainers(containerNames) {
  const docker = new Docker({ socketPath, Promise });

  return await Promise.map(containerNames, name => ({
    name,
    container: docker.getContainer(name),
  }))
    .filter(containerNotRunning)
    .each(startLog);
}

module.exports = (async function() {
  try {
    await checkSocket();
    await startContainers(['couchdb', 'mariadb', 'mongodb', 'redis']);
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
})();
