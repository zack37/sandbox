function createPojo(members, ...values) {
  const pojo = {};
  for(var i = 0; i < members.length; i++) {
    pojo[members[i]] = values[i];
  }
  return pojo;
}

function define(...members) {
  return createPojo.bind(null, members);
}

const dog = define('name', 'age');

const TOTAL = 1000;
let sum = 0;

for (var i = 0; i < TOTAL; i++) {
  const start = process.hrtime();
  dog('Fido', 2);
  const [s, ns] = process.hrtime(start);
  sum += s * 1000 + ns / 1e6;
}
console.log('Average execution:', (sum / TOTAL).toFixed(5), 'ms');
