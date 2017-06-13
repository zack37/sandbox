const ringBuffer = ringSize => {
  let array = [];
  let offset = 0;

  return {
    push: n => {
      array = [...array.slice(-(ringSize - 1)), n];
      offset++;
      return this;
    },
    get: idx => {
      return array[(idx + offset) % ringSize];
    },
    valueOf: () => array
  };
};

const rb = ringBuffer(5);

[...Array(20).keys()].forEach(x => {
  rb.push(x);
  console.log(rb.valueOf());
});
