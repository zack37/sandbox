// ARRAY 1
const texasss = [
  {
    name: 'Mike',
    age: 23,
    gender: 'm',
    us: false,
  },
  {
    name: 'Liz',
    age: 20,
    gender: 'f',
    us: true,
  },
  {
    name: 'Chris',
    age: 102,
    gender: 'm',
    us: true,
  },
  {
    name: 'Chuloo',
    age: 27,
    gender: 'm',
    us: false,
  },
  {
    name: 'Annie',
    age: 30,
    gender: 'f',
    us: true,
  },
];

console.group('texasss');
// Part 1 - Find all users older than 24
console.log('Part 1', texasss.filter(x => x.age > 24));
// Part 2 - Find the total age of all users
console.log('Part 2', texasss.reduce((acc, cur) => acc + cur.age, 0));
// Part 3 - List all female coders
console.log('Part 3', texasss.filter(x => x.gender === 'f'));
console.groupEnd('texasss');

// ARRAY 2
const newieyork = [
  {
    name: 'Michelle',
    age: 19,
    coder: true,
    gender: 'f',
    us: true,
  },
  {
    name: 'Sam',
    age: 25,
    coder: false,
    gender: 'm',
    us: false,
  },
  {
    name: 'Ivy',
    age: 26,
    coder: true,
    gender: 'f',
    us: false,
  },
  {
    name: 'Nick',
    age: 32,
    coder: true,
    gender: 'm',
    us: true,
  },
  {
    name: 'Jim Beglin',
    age: 65,
    coder: false,
    gender: 'm',
    us: true,
  },
];

console.group('newieyork');
// Part 1 - List all users in US in ascending order
console.log(
  'Part 1',
  newieyork.filter(x => x.us).sort((a, b) => (a.name > b.name ? 1 : -1)),
);
// Part 2 - Sort all users by age
console.log('Part 2', newieyork.sort((a, b) => a.age - b.age));
// Part 3 -  List all female coders
console.log('Part 3', newieyork.filter(x => x.coder && x.gender === 'f'));
console.groupEnd('newieyork');

// ARRAY 3
const vegzas = [
  {
    name: 'Charly',
    age: 32,
    coder: true,
    gender: 'm',
  },
  {
    name: 'Law',
    age: 21,
    coder: true,
    gender: 'm',
  },
  {
    name: 'Rosey',
    age: 42,
    coder: false,
    gender: 'f',
  },
  {
    name: 'Steph',
    age: 18,
    coder: true,
    gender: 'f',
  },
  {
    name: 'Jon',
    age: 47,
    coder: false,
    gender: 'm',
  },
];

console.group('vegzas');
// Part 1 - Find the total age of male coders under 25
console.log(
  'Part 1',
  vegzas
    .filter(x => x.coder && x.age < 25)
    .reduce((acc, cur) => acc + cur.age, 0),
);
// Part 2 - List all male coders over 30
console.log(
  'Part 2',
  vegzas.filter(x => x.coder && x.gender === 'm' && x.age > 30),
);
// Part 3 - Find the total age of everyone in texasss, newieyork and vegzas combined.
const tAge = texasss.reduce((acc, cur) => acc + cur.age, 0);
const nAge = newieyork.reduce((acc, cur) => acc + cur.age, 0);
const vAge = vegzas.reduce((acc, cur) => acc + cur.age, 0);

console.log('Part 3', tAge + nAge + vAge);
console.groupEnd('vegzas');
