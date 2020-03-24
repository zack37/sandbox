function fivePenceHandler(coin, next) {
  const meetsWeight = Math.abs(coin.weight - 3.25) < 0.02;
  const meetsDiameter = Math.abs(coin.diameter - 18) < 0.01;

  return meetsWeight && meetsDiameter
    ? { name: '5 Pence', display: '5p' }
    : next(coin);
}

function tenPenceHandler(coin, next) {
  const meetsWeight = Math.abs(coin.weight - 6.5) < 0.03;
  const meetsDiameter = Math.abs(coin.diameter - 24.9) < 0.15;

  return meetsWeight && meetsDiameter
    ? { name: '10 Pence', display: '10p' }
    : next(coin);
}

function twentyPenceHandler(coin, next) {
  const meetsWeight = Math.abs(coin.weight - 5) < 0.01;
  const meetsDiameter = Math.abs(coin.diameter - 21.5) < 0.1;

  return meetsWeight && meetsDiameter
    ? { name: '20 Pence', display: '20p' }
    : next(coin);
}

function fiftyPenceHandler(coin, next) {
  const meetsWeight = Math.abs(coin.weight - 8) < 0.02;
  const meetsDiameter = Math.abs(coin.diameter - 27.3) < 0.15;

  return meetsWeight && meetsDiameter
    ? { name: '50 Pence', display: '50p' }
    : next(coin);
}

function onePoundHandler(coin, next) {
  const meetsWeight = Math.abs(coin.weight - 9.5) < 0.02;
  const meetsDiameter = Math.abs(coin.diameter - 22.3) < 0.13;

  return meetsWeight && meetsDiameter
    ? { name: '1 Pound', display: '1£' }
    : next(coin);
}

const chain = handlers => {
  const handleNext = ([head, ...tail]) => state => {
    const next = tail.length ? handleNext(tail) : () => undefined;
    return head(state, next);
  };

  return {
    handle: state => {
      const [handler, ...tail] = handlers;
      return handler && handler(state, handleNext(tail));
    },
  };
};

const coins = [
  { weight: 3.25, diameter: 18 },
  { weight: 6.5, diameter: 24.9 },
  { weight: 8.01, diameter: 27.31 },
  { weight: 9, diameter: 22.5 },
];

const chainImpl = chain([
  fivePenceHandler,
  tenPenceHandler,
  twentyPenceHandler,
  fiftyPenceHandler,
  onePoundHandler,
]);

coins.map(chainImpl.handle).forEach(c => console.log(c || 'No coin found'));
