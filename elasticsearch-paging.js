const { Observable, Scheduler } = require('rxjs');
const { Client } = require('elasticsearch');
const ProgressBar = require('progress');

const esClient = new Client({
  host: '',
});
const index = 'dealer_index';
const type = 'epc_rate';
let progress;

const query = {};
const cursor = '';

function search({ size, from, body }) {
  return Observable.create((observer) => {
    redisClint.scan(..., (err, [nextCursor, results]) => {
      cursor = nextCursor;
      if(err) {
        return observer.error(err);
      }
      if(results.length === 0) {
        return observer.complete();
      }

      observer.next(results);
    })
  });
  return Observable.defer(() => {
    return esClient.search({ size, from, index, type, body }).then(response => {
      const { total, hits } = response.hits;

      return {
        total,
        data: hits.map(({ _id, _source }) => ({ id: _id, ..._source })),
      };
    });
  });
  // .delay(500);
}

function pageSearch(size, body) {
  /// Slightly more efficient, but uglier version
  // let page = 0;
  // return Observable.of(page)
  //   .concatMap(start => search({ from: start, size, body }))
  //   .do(({ total }) => {
  //     progress = new ProgressBar('[:bar] :current/:total :elapseds', {
  //       total,
  //       width: Math.min(50, total),
  //       renderThrottle: 0,
  //     });
  //   })
  //   .expand(({ total }) => {
  //     page++;
  //     return total != null && page * size < total
  //       ? search({ from: page * size, size, body })
  //       : Observable.empty();
  //   });

  /// Makes 1 extra request, but looks much nicer
  return Observable.range(0, Infinity, Scheduler.asap)
    .concatMap(page => search({ from: page * size, size, body }))
    .do(({ total }) => {
      if (!progress) {
        progress = new ProgressBar('[:bar] :current/:total :elapseds :rate', {
          total,
          width: Math.min(50, total),
          renderThrottle: 0,
        });
      }
    })
    .takeWhile(results => results.data.length);
}

function run() {
  const size = 1000;
  return (
    pageSearch(size, query)
      // .map(prop('data'))
      // .flatMap(list => Observable.from(list))
      // .do(() => console.log('got stuff'))
      .subscribe(({ data }) => {
        progress.tick(data.length);
      })
  );
}

run();
