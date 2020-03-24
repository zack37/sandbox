const { Observable } = require('rxjs/Rx');
const { baconId } = require('./consts');
const debug = require('debug')('shitpost:bacon');

module.exports = sender$ => {
  debug('initializing');
  return Observable.from(sender$).filter(msg => msg.author.id === baconId);
};
