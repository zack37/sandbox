const os = require('os');

const result = os.cpus().map((cpu, i) => {
  const keys = Object.keys(cpu.times);

  const total = keys.reduce((acc, cur) => acc + cpu.times[cur], 0);

  return keys.map(type => {
    const percent = Math.round(100 * cpu.times[type] / total);
    return { core: i, type, percent };
  });
});

console.log(result);
