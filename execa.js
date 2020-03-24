const execa = require('execa');

execa.stdout('yarn', ['--version']).then(console.log);
