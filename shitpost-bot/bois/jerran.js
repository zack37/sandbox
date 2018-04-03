const { Observable } = require('rxjs/Rx');
const { jerranId } = require('./consts');
const { random } = require('./helpers');
const responses = require('./responses');
const debug = require('debug')('shitpost:jerran');

module.exports = sender$ => {
  debug('initializing');
  return Observable.from(sender$)
    .filter(msg => msg.author.id === jerranId)
    .mergeMap(async msg => {
      debug('Running jerran pipeline');
      if (random() <= 0.3) {
        await msg.react(responses.wendyParrot);
      }
    });
};
