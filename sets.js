const setA = new Set([1, 2, 3, 4]);
const setB = new Set([2, 3]);
const setC = new Set([3, 4, 5, 6]);

function isSuperset(set, subset) {
  for (const elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }

  return true;
}

function union(a, b) {
  return new Set([...a, ...b]);
}

function intersection(a, b) {
  const retVal = new Set();
  for (const elem of b) {
    if (a.has(elem)) {
      retVal.add(elem);
    }
  }
  return retVal;
}

function difference(a, b) {
  const retVal = new Set(a);
  for (const elem of b) {
    retVal.delete(elem);
  }

  return retVal;
}

console.log(isSuperset(setA, setB));
console.log(isSuperset(setA, setC));
console.log(union(setA, setC));
console.log(intersection(setA, setC));
console.log(difference(setA, setC));
