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
  let value;

  await wait();
  value = 5;

  console.log('value', value);
  return value;
}

race().then(v => {
  console.log('v', v);
});

raceAsync().then(v => {
  console.log('v', v);
});
