const os = require('os');

const result = os.cpus().map((cpu, i) => {
  const entries = Object.entries(cpu.times);

  const total = entries.reduce((acc, [, value]) => acc + value, 0);

  return entries.map(([type, load]) => {
    const percent = Math.round((100 * load) / total);
    return { core: i, type, percent };
  });
});

console.log(result);
