const { Observable } = require('rxjs');
const cron = require('cron');

const subscription = Observable.create(o => {
  const job = cron.job({
    cronTime: '*/1 * * * * *',
    onTick: () => o.next('tick'),
    onComplete: () => o.complete(),
    start: true,
  });

  return () => job.stop();
}).subscribe({ next: console.log, complete: () => console.log('done') });

setTimeout(() => subscription.unsubscribe(), 10000);
