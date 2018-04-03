const { Observable } = require('rxjs/Rx');
const { zackId } = require('./consts');
const { random } = require('./helpers');
const debug = require('debug')('shitpost:zack');
const responses = require('./responses');

module.exports = sender$ => {
  debug('initializing');
  return Observable.from(sender$)
    .filter(msg => msg.author.id === zackId)
    .mergeMap(async msg => {
      debug('Running zack pipeline');
      const rnd = random();
      if (rnd <= 0.2) {
        debug('reacting with :zack: emoji');
        await msg.react(responses.zack);
      }
    });
};
