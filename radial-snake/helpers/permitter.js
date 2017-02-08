const Boom = require('boom');
const ipGrabber = require('./ip-grabber');

const defaultPermissions = [ipGrabber.local(), '127.0.0.1', 'localhost'];

module.exports.file = (path, permissions, req, reply) => {
	permissions = permissions.concat(defaultPermissions);
	return permissions.includes(req.info.remoteAddress)
		? reply.file(path)
		: reply(Boom.forbidden('Missing permissions'));
}
