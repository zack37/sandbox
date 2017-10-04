const { Observable } = require('rxjs/Rx');
const ProgressBar = require('progress');
const { add } = require('ramda');

const SCALE = 0.5;
const SWITCH_INTERVAL = SCALE % 0.5 === 0 ? 7.5 : 7;
const TOTAL_SECONDS = 120;
const END_TIME = TOTAL_SECONDS / SCALE;
const NUM_SWITCHES = 16;
const INTERVAL = 100 * SCALE;

const timer$ = Observable.interval(INTERVAL).take(END_TIME).map(add(1));
const progress = new ProgressBar('brushing [:bar] :current :message', {
  complete: '=',
  incomplete: ' ',
  total: TOTAL_SECONDS
});

const shouldSwitch = x =>
  x % SWITCH_INTERVAL === 0 && x < NUM_SWITCHES * SWITCH_INTERVAL;

progress.render({ message: 'START' });

timer$.subscribe({
  next: () => progress.tick(SCALE, { message: '' }),
  complete: () => console.log('DONE')
});

timer$
  .filter(shouldSwitch)
  .subscribe(() => progress.render({ message: 'SWITCH' }));
