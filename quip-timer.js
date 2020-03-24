const { Observable, Subject } = require('rxjs/Rx');
const ProgressBar = require('progress');
const { add } = require('ramda');

const SCALE = 1;
const SWITCH_INTERVAL = SCALE % 1 === 0 ? 7 : 7.5;
const TOTAL_SECONDS = 20;
const END_TIME = TOTAL_SECONDS / SCALE;
const NUM_SWITCHES = 16;
const INTERVAL = 1000 * SCALE;

const timer$ = Observable.interval(INTERVAL)
  .take(END_TIME)
  .map(add(1));
const switchLabel$ = new Subject();
const progress = new ProgressBar('brushing [:bar] :current :message', {
  complete: '=',
  incomplete: ' ',
  head: '>',
  total: TOTAL_SECONDS,
  stream: process.stdout,
});

const shouldSwitch = x =>
  x % SWITCH_INTERVAL === 0 && x < NUM_SWITCHES * SWITCH_INTERVAL;

progress.render({ message: 'START' });

timer$.subscribe({
  next: () => progress.tick(SCALE, { message: '' }),
  complete: () => {
    progress.terminate();
  },
});

timer$.filter(shouldSwitch).subscribe(() => switchLabel$.next());

switchLabel$.subscribe(() => {
  progress.render({ message: 'SWITCH' });
});
