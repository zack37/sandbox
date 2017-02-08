const OS = require('os');

module.exports.local = () => {
  const interfaces = OS.networkInterfaces();

  for(let k in interfaces) {
    for(let k2 in interfaces[k]) {
      let { family, internal, address } = interfaces[k][k2];
      if(family === 'IPv4' && !internal) {
        return address;
      }
    }
  }
};
