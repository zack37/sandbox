const { Observable } = require('rxjs/Observable');
require('rxjs/add/observable/range');
require('rxjs/add/operator/reduce');

const fact = (n, p = 1) => (n < 0 ? -1 : n <= 1 ? p : fact(n - 1, p * n));
const fact$ = n => Observable.range(2, n - 1).reduce((acc, cur) => acc * cur);

const limit = Number(process.argv[2] || 5);

console.log(fact(limit));
fact$(limit).subscribe(console.log);
