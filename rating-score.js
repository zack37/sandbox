const R = require('ramda');

const getStars = (count, rating) => {
  return R.repeat(rating, count);
};

const scoreForRatings = (ratings, maxRating = 5) => {
  const middle = Math.ceil(maxRating / 2);
  return R.pipe(
    R.map(x => x - middle),
    R.sum,
  )(ratings);
};

const fiveStars = getStars(4405, 5);
const fourStars = getStars(609, 4);
const threeStars = getStars(129, 3);
const twoStars = getStars(113, 2);
const oneStars = getStars(186, 1);

const switchRatings = R.chain(x => x, [
  fiveStars,
  fourStars,
  threeStars,
  twoStars,
  oneStars,
]);

console.time('single rating');
console.log(scoreForRatings(switchRatings));
console.timeEnd('single rating');

console.time('10000 ratings');
scoreForRatings(new Array(10000).fill(switchRatings));
console.timeEnd('10000 ratings');
