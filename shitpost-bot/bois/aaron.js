const { Observable } = require('rxjs/Rx');
const { aaronId } = require('./consts');
const { random } = require('./helpers');
const responses = require('./responses');
const debug = require('debug')('shitpost:aaron');

module.exports = sender$ => {
  debug('initializing');
  return Observable.from(sender$)
    .filter(msg => msg.author.id === aaronId)
    .mergeMap(async msg => {
      debug('Running aaron pipeline');
      const rnd = random();
      if (rnd <= 0.05) {
        await msg.channel.send(responses.bepsiGif);
        await msg.channel.send(responses.aaronIrl);
      } else if (rnd <= 0.3) {
        await msg.react(responses.bepsiReact);
      }
    });
};
