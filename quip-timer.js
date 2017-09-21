const { Observable, Subject } = require('rxjs/Rx');

const SWITCH_INTERVAL = 7;
const END_TIME = 120;
const NUM_SWITCHES = 16;

console.log('START');

const timer$ = Observable.interval(1000).takeWhile(x => x < END_TIME);

// Used to send logs asynchronously
const log$ = new Subject();
log$.subscribe(console.log);

function shouldSwitch(x) {
  return x % SWITCH_INTERVAL === 0 && x <= NUM_SWITCHES * SWITCH_INTERVAL;
}

timer$
  .skip(1)
  .filter(shouldSwitch)
  .subscribe(() => log$.next('SWITCH'));

timer$.subscribe({
  complete: () => log$.next('DONE')
});
