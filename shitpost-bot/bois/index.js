const { Observable } = require('rxjs/Rx');
const debug = require('debug')('shitpost:bois');
const aaron = require('./aaron');
const bacon = require('./bacon');
const jerran = require('./jerran');
const rizo = require('./rizo');
const zack = require('./zack');
const responses = require('./responses');
const { zackId, rizoId } = require('./consts');
const { strip } = require('./helpers');

const sgobois = text =>
  strip(text).includes('letsgo') || strip(text).includes('ketsgi');

const anyone = sender$ => {
  debug('initializing');
  return Observable.from(sender$).mergeMap(async msg => {
    debug('Running generic pipeline');
    if (msg.content.includes(`@<${responses.zack}>`)) {
      debug('mentioning zack');
      await msg.channel.send(`<@${zackId}>`);
    }
    if (msg.content.includes(`<@${rizoId}>`)) {
      debug('responding with `rizopls`');
      for (const r of 'rizopls'.split('')) {
        await msg.react(responses[r]);
      }
    }
    if (sgobois(msg.content)) {
      debug('responding with party parrot');
      await msg.react(responses.partyParrot);
    }
  });
};

module.exports = sender$ => {
  return [aaron, anyone, bacon, jerran, rizo, zack].map(boi => boi(sender$));
};
