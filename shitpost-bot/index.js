const { Client } = require('discord.js');
const { Observable, Subject } = require('rxjs/Rx');
const ms = require('ms');
const debug = require('debug')('shitpost');
const { discord: { authToken } } = require('./config');
const bois = require('./bois');
const { ThrowOnOperator } = require('../rxjs-throwOn');

const maxAttempts = 5;

function isIncorrectToken(message) {
  return (
    message === 'An invalid token was provided.' |
    message === 'Incorrect login details were provided.'
  );
}

function init(bot) {
  const sender$ = new Subject();
  const error$ = new Subject();
  debug('initializing bois');
  //                                          forward errors to error pipeline
  bois(sender$).forEach(boi => boi.subscribe({ error: e => error$.next(e) }));

  return Observable.fromEvent(bot, 'message')
    .takeUntil(Observable.fromEvent(bot, 'disconnect'))
    .lift(new ThrowOnOperator(error$))
    .lift(new ThrowOnOperator(Observable.fromEvent(bot, 'error')))
    .do(msg => {
      debug('checking for shut-off condition');
      if (msg.content === authToken) {
        debug(
          `Emergency shut-off requested by ${msg.author.username}#${
            msg.author.discriminator
          } id ${msg.author.id}`
        );
        // exit instead of set exitCode because this needs to be shut off immediately
        process.exit(503);
      }
    })
    .forEach(msg => {
      debug('sending message through pipelines');
      sender$.next(msg);
    });
}

function runBot() {
  let bot;
  return Observable.defer(() => {
    bot = new Client();
    debug('logging in');

    return Observable.forkJoin(
      Observable.fromEvent(bot, 'ready')
        .first()
        .do(() => debug('ready')),
      bot.login(authToken).then(() => debug('logged in')),
    ).timeout(2500);
  })
    .do(() => debug('client initialization finished'))
    .map(() => bot)
    .concatMap(init)
    .retryWhen(errors$ => {
      const attempt$ = Observable.range(1, maxAttempts);

      return Observable.zip(attempt$, errors$).mergeMap(
        async ([attempt, error]) => {
          if (isIncorrectToken(error.message)) {
            debug('Discord auth token is invalid');
            process.exit(1); // exit the app because no number of retries will correct the problem
          }

          debug('error encountered', error);
          debug(`Attempt #${attempt}/${maxAttempts}`);
          debug('destroying bot connection');
          await bot.destroy();

          if (attempt === maxAttempts) {
            debug('Reached maximum number of retry attempts');
            process.exit(1);
          }

          const wait = ms(`${attempt}m`);
          debug(`Retrying after ${ms(wait, { long: true })}`);
          await Observable.timer(wait).toPromise();
        }
      );
    })
    .subscribe();
}

runBot();
