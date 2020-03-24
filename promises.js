const wait = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 100);
  });
};

const race = () => {
  let value;

  return wait()
    .then(() => {
      value = 5;
    })
    .then(() => {
      console.log('value', value);
      return value;
    });
};

async function raceAsync() {
  await wait();
  const value = await 5;

  console.log('value', value);
  return value;
}

console.time('race');
race().then(v => {
  console.log('v', v);
  console.timeEnd('race');
});

console.time('raceAsync');
raceAsync().then(v => {
  console.log('v', v);
  console.timeEnd('raceAsync');
});
