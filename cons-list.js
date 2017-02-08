/*eslint no-use-before-define: off */
const map = fn => list => {
  return list.isEmpty
    ? list
    : cons(fn(list.head), map(fn)(list.tail));
};

const reduce = (fn, acc) => list => {
  if(list.isEmpty) {
    return acc;
  }

  if(acc == null) {
    acc = list.head;
    list = list.tail;
  }
  return reduce(fn, fn(acc, list.head))(list.tail);
};

const filter = predicate => list => {
  return list.isEmpty
    ? list
    : predicate(list.head)
      ? cons(list.head, filter(predicate)(list.tail))
      : filter(predicate)(list.tail);
};
class Cons {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
    this.isEmpty = false;
  }

  map(fn) {
    return map(fn)(this);
  }

  reduce(fn, acc) {
    return reduce(fn, acc)(this);
  }

  filter(predicate) {
    return filter(predicate)(this);
  }

  toArray() {
    return toArray(this);
  }
}

const cons = (head, tail) => {
  return new Cons(head, tail);
};

const nil = new class Nil {
  get head() {
    throw new Error('Cannot get head of empty list');
  }

  get tail() {
    throw new Error('Cannot get tail of empty list');
  }

  constructor() {
    this.isEmpty = true;
  }
};

const list = function() {
  if(!arguments.length) {
    return nil;
  }
  const args = Array.isArray(arguments[0]) ? arguments[0] : arguments;
  const [ head, ...tail ] = [...args];
  return cons(head, list(...tail));
};

const toArray = reduce((acc, cur) => acc.concat(cur), []);


let consList = cons(1, cons(2, cons(3, nil)));
const double = x => x*2;
const add = (acc, cur) => acc + cur;

console.log(map(double)(consList));
console.log(consList.map(double));
console.log(reduce(add, 0)(consList));
console.log(consList.reduce(add, 0));
console.log(toArray(consList));
console.log(consList.toArray());
console.log(list(1, 2, 3));
console.log(list(1, 2, 3).filter(x => x % 2 === 1).toArray());
