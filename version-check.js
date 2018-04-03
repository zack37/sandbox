const semver = require('semver');

const clientVersions = {
  Neo: '3.1.90',
  Apollo: '3.1.90',
};

function getVersionFromAgent(userAgent) {
  const [app, version] = userAgent.split(' ')[0].split('/');

  return { app, version: semver.valid(semver.parse(version)) };
}

function versionCheck(userAgent) {
  const { app, version } = getVersionFromAgent(userAgent || 'Undefined/0.0.0');
  const minVersion = clientVersions[app];
  return {
    valid: !minVersion || semver.satisfies(version, `>=${minVersion}`),
    app,
    version,
    minVersion,
  };
}

console.log(versionCheck('Neo/3.1.90'));
console.log(versionCheck('Neo/3.2'));
console.log(versionCheck('Neo/0.0.1'));
console.log(versionCheck('Neo/99.99.99'));
console.log(versionCheck('Undefined/0.0.0'));
console.log(versionCheck(''));
console.log(versionCheck('Mozilla/5.0'));
console.log(versionCheck());
