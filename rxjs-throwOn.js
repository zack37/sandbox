const { Observable } = require('rxjs/Rx');
const { OuterSubscriber } = require('rxjs/OuterSubscriber');
const { subscribeToResult } = require('rxjs/util/subscribeToResult');
// const { EventEmitter } = require('events');

// const e = new EventEmitter();

class ThrowOnSubscriber extends OuterSubscriber {
  constructor(destination, notifier) {
    super(destination);
    this.notifier = notifier;
    this.add(subscribeToResult(this, notifier));
  }

  notifyNext(outerValue, innerValue) {
    this.error(innerValue);
  }

  // notifyComplete() {}
}

class ThrowOnOperator {
  constructor(notifier) {
    this.notifier = notifier;
  }

  call(subscriber, source) {
    return source.subscribe(new ThrowOnSubscriber(subscriber, this.notifier))
  }
}

Observable.prototype.throwOn = function(notifier) {
  return this.lift(new ThrowOnOperator(notifier));
}

function throwOn(notifier) {
  return source => {
    return notifier.subscribe((err) => source.error(err));
  };
}

module.exports = {
  throwOn,
  ThrowOnOperator
};

// Observable.fromEvent(e, 'data')
//   .takeUntil(Observable.fromEvent(e, 'end'))
//   .throwOn(Observable.fromEvent(e, 'error'))
//   .subscribe({
//     next(v) { console.log('value', v); },
//     complete() { console.log('complete'); },
//     error(e) { console.error('error', e); }
//   });

// e.emit('data', 'value1');
// e.emit('data', 'value2');
// e.emit('data', 'value4');
// e.emit('data', 'value5');
// e.emit('data', 'value6');
// e.emit('data', 'value7');
// e.emit('data', 'value8');
// e.emit('data', 'value9');
// e.emit('error', new Error('Just because I can'));
// e.emit('data', 'value10');
// e.emit('data', 'value11');
// e.emit('data', 'value12');
// e.emit('end');

// Observable.interval(1000)
//   .takeWhile(i => i < 10)
//   .concatMap(i => Observable.of(i).delay(2000))
//   .subscribe(console.log);
