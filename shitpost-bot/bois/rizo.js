const { Observable } = require('rxjs/Rx');
const { rizoId } = require('./consts');
const { random } = require('./helpers');
const debug = require('debug')('shitpost:rizo');
const responses = require('./responses');

module.exports = sender$ => {
  debug('initializing');
  return Observable.from(sender$)
    .filter(msg => msg.author.id === rizoId)
    .mergeMap(async msg => {
      debug('Running rizo pipeline');
      const rnd = random();
      if (rnd < 0.05) {
        // parrot wave
        for (const r of '7654321'.split('')) {
          await msg.react(responses[`parrotWave${r}`]);
        }
      }
      else if (rnd <= 0.15) {
        await msg.react(responses.partyParrot);
      }
      else if (rnd <= 0.2) {
        await msg.react(responses.ultraFastParrot);
      }
    });
};
