function f(a, b) {
  return (a * a + b * b) / (a * b + 1);
}

const as = Array.from({ length: 10 }, (_, i) => i);
const bs = Array.from({ length: 10 }, (_, i) => i);

const resultMatrix = [];

for (const a of as) {
  resultMatrix[a] = [];
  for (const b of bs) {
    const answer = f(a, b);
    resultMatrix[a][b] = answer;
  }
}

console.log(resultMatrix);
