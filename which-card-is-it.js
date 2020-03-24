const f = n =>
  `${
    'two three four five six seven eight nine ten jack queen king ace'.split(
      ' ',
    )[n % 13]
  } of ${['heart', 'diamond', 'spade', 'club'][(n / 13) << 0]}s`;

Array.from({ length: 52 }, (_, i) => i).forEach(i =>
  console.log(`${i + 1} -> ${f(i)}`),
);
