const blipp = require('blipp');
const Hapi = require('hapi');
const inert = require('inert');
const Promise = require('bluebird');

const endpoints = require('./routes/endpoints');
const ipGrabber = require('./helpers/ip-grabber');
const pages = require('./routes/pages');

const port = 8000;
const localIp = ipGrabber.local();

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: __dirname
      }
    }
  }
});

server.connection({ port: process.env.PORT || port });

server.ext('onPreResponse', (req, reply) => {
  const res = req.response;

  console.log(`Outcoming response:
in: ${new Date()}
to: ${req.info.remoteAddress}
method: ${req.method}
url: ${req.url.path}
status ${res.statusCode || res.output.statusCode}
`);
  reply.continue();
});

return server.register([ blipp, inert, endpoints, pages ])
  .then(() => server.start())
  .then(() => {
    console.log();
    console.log('---------- -------- ------ ---- --');
    console.log('----- ---- --- -- -');
    console.log(`Server running at ${localIp}:${port}`);
    console.log('----- ---- --- -- -');
    console.log('---------- -------- ------ ---- --');
    console.log();
  })
  .catch(e => {
    console.log(e.stack);
    throw e;
  });
