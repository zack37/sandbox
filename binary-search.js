const search = (term, list) => {
  const n = Math.floor(list.length / 2);
  return list[n] === term
    ? list[n]
    : list[n] < term && list.length > 1
      ? search(term, list.slice(n, list.length+1))
      : list[n] > term && list.length > 1
        ? search(term, list.slice(0, n))
        : -1;
};

const whileSearch = (term, list) => {
  let n = Math.floor(list.length / 2);
  for(let i = 0; i < Math.log2(list.length); i++) {
    if(list[n] === term) {
      return n;
    }
    else if (list[n] > term) {
      n = Math.floor(n/2);
    }
    else {
      n = Math.floor(n*1.5);
    }
  }
  return -1;
};

console.log('0', search(0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('1', search(1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('2', search(2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('3', search(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('4', search(4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('5', search(5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('6', search(6, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('7', search(7, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('8', search(8, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('9', search(9, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('10' ,search(10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('11', search(11, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

console.log('0', whileSearch(0, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('1', whileSearch(1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('2', whileSearch(2, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('3', whileSearch(3, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('4', whileSearch(4, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('5', whileSearch(5, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('6', whileSearch(6, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('7', whileSearch(7, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('8', whileSearch(8, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('9', whileSearch(9, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('10' ,whileSearch(10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log('11', whileSearch(11, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
