const reduce = (fn, init, list) => {
  const inner = ([head, ...tail], acc) => {
    if (!head) {
      return acc;
    }

    return inner(tail, fn(acc, head));
  };

  if (init === null || init === undefined) {
    [init, ...list] = list;
  }

  return inner(list, init);
};

const pipe = (...fns) => init => {
  const inner = ([head, ...tail], acc) => {
    if (!head) {
      return acc;
    }

    return inner(tail, head(acc));
  };

  return inner(fns, init);
};

const compose = (...fns) => init => {
  const inner = ([head, ...tail], acc) => {
    if (!head) {
      return acc;
    }

    return inner(tail, head(acc));
  };

  return inner(fns.reverse(), init);
};

const tap = msg => value => {
  console.log(msg, value);
  return value;
};

console.log(reduce((acc, cur) => acc + cur, 0, [1, 2, 3, 4]));

console.log(
  pipe(
    tap('a'),
    tap('b'),
  )(1),
);

console.log(
  compose(
    tap('a'),
    tap('b'),
  )(1),
);
