const benchmarkPrint = require('./benchmark-print');
const Suite = require('benchmark').Suite;

const onComplete = function() {
  console.log(`${this.name} results: `);
  benchmarkPrint(this);
  console.log();
};

const odd = 119783547804531809145780463;
const even = 10809341890290640872352828;

const suite = new Suite('Mod vs. Bitwise AND', { onComplete })
  .add('mod even', () => {
    for(var i = 0; i < 100000; i++) {
      even % 2 === 0;
    }
  })
  .add('mod odd', () => {
    for(var i = 0; i < 100000; i++) {
      odd % 2 === 1;
    }
  })
  .add('bitwise AND even', () => {
    for(var i = 0; i < 100000; i++) {
      (even & 1) === 0;
    }
  })
  .add('bitwise AND odd', () => {
    for(var i = 0; i < 100000; i++) {
      (odd & 1) === 1;
    }
  });

suite.run({ async: true });
