const package = require('../package');
const permitter = require('../helpers/permitter');

const getGame = (req, reply) => {
	return permitter.file('./views/game.html', [], req, reply);
};
const getSpecRunner = (req , reply) => {
	return permitter.file('./views/spec-runner.html', [], req, reply);
};

const register = (server, options, next) => {
	server.route({ method: 'GET', path: '/', handler: getGame });
	server.route({ method: 'GET', path: '/test', handler: getSpecRunner });
	next();
};

register.attributes = {
	name: 'pages',
	version: package.version
};

module.exports = {
	register
}
