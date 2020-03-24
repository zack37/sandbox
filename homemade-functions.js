function isNil(value) {
  return value === null || value === undefined;
}

/**
 * High order function used to collect a list of values into some output
 *
 * @param {Function} reducer function that reduces the collection of values into the output value
 * @param {any} initial initial value passed into `reducer`
 * @param {Array<any>} list the array to iterate over
 * @returns
 */
function reduce(reducer, initial, list) {
  if (isNil(reducer) || typeof reducer !== 'function') {
    throw new TypeError('reducer must be provided and must be a function');
  }

  /*
   // When TCO is supported in node
   function reduceInner(reducer, [ head, ...tail ], acc) {
     return !head
       ? acc
       : reduceInner(reducer, tail, reducer(acc, head));
   }
  */

  /*
   // if real pattern matching is ever supported in node
   function reduceInner(reducer, list, acc) {
    return match list {
      [head, tail] => reduceInner(reducer, tail, reducer(acc, head)),
       _ => acc
    }
  }
  */

  // return reduceInner(reducer, list, initial);

  let i;
  let acc = initial;
  const { length } = list;

  for (i = 0; i < length; i++) {
    acc = reducer(acc, list[i]);
  }

  return acc;
}

function map(projection, functor) {
  return reduce((acc, cur) => [...acc, projection(cur)], [], functor);
}

function filter(predicate, list) {
  return reduce((acc, cur) => (predicate(cur) ? [...acc, cur] : acc), [], list);
}

function some(predicate, list) {
  // TCO Version
  // function inner(p, [head, ...tail]) {
  //   if(!head) {
  //     return false;
  //   }
  //   if(predicate(head)) {
  //     return true;
  //   }

  //   return inner(p, tail);
  // }

  // return inner(predicate, list);

  let i;
  const { length } = list;
  let cur;

  for (i = 0; i < length; i++) {
    cur = list[i];
    if (predicate(cur)) {
      return true;
    }
  }
  return false;
}

function every(predicate, list) {
  // TCO Version
  // function inner(p, [head, ...tail]) {
  //   if (!head) {
  //     return true;
  //   }
  //   if (!predicate(head)) {
  //     return false;
  //   }

  //   return inner(p, tail);
  // }

  // return inner(predicate, list);

  let i;
  const { length } = list;
  let cur;

  for (i = 0; i < length; i++) {
    cur = list[i];
    if (!predicate(cur)) {
      return false;
    }
  }
  return true;
}

function flatMap(projection, list) {
  // Cleaner version
  // return reduce((acc, cur) => [...acc, ...projection(cur)], [], list);

  let i;
  let j;
  const { length } = list;
  let cur;
  let curLength;
  const results = [];

  for (i = 0; i < length; i++) {
    cur = projection(list[i]);
    curLength = cur.length;

    for (j = 0; j < curLength; j++) {
      results.push(cur[j]);
    }
  }

  return results;
}

/*
- map
- filter
- some
- every
- flatMap
*/

const testList = [...new Array(8).keys()].slice(1);

const mapped = map(x => x * 2, testList);
console.log('mapped', mapped);

const filtered = filter(x => (x & 1) === 0, testList);
console.log('filtered', filtered);

const somed = some(x => x > 5, testList);
console.log('somed', somed);

const everyed = every(x => x > 0, testList);
console.log('everyed', everyed);

const flatMapped = flatMap(x => [x - 1, x, x + 1], testList);
console.log('flatMapped', flatMapped);
