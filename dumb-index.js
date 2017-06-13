const R = require('ramda');

const table = {
  id1: {
    column1: '1',
    column2: '2'
  },
  id2: {
    column1: '3',
    column2: '4'
  },
  id3: {
    column1: '5',
    column2: '6'
  }
};

const column1Index = R.compose(
  R.map(([key, value]) => ({ index: value.column1, id: key })),
  R.toPairs()
)(table);

const lessThan4IndexIds = column1Index.filter(x => x.index < 4).map(x => x.id);
const lessThan4 = lessThan4IndexIds.map(x => table[x]);

console.log(lessThan4);
