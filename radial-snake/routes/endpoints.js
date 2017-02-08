const package = require('../package');

function register(server, options, next) {

	const resourceRoutes = ['scripts', 'styles', 'libs', 'images']
		.map(x => ({
			method: 'GET',
			path: `/${x}/{path*}`,
			handler: {
				directory: {
					path: `./resources/${x}/`
				}
			}
		}));
	const assetRoutes = ['textures', 'fonts']
		.map(x => ({
			method: 'GET',
			path: `/${x}/{path*}`,
			handler: {
				directory: {
					path: `./resources/assets/${x}/`
				}
			}
		}));

	server.route(resourceRoutes.concat(assetRoutes));

	next();
}

register.attributes = {
	name: 'endpoints',
	version: package.version
};

module.exports = {
	register
};
