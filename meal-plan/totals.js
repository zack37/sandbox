const { green, underline, yellow } = require('chalk');
const R = require('ramda');
const startCase = require('lodash/startCase');

const meals = require('./meals');

// prettier-ignore
const formatIngredient = i => `${underline(i.name)}: ${i.amount || ''}\n\t${yellow(i.kcal)} kcal  |  ${yellow(i.carbs.toFixed(1))}g Carbs  |  ${yellow(i.fat.toFixed(1))}g Fat  |  ${yellow(i.protein.toFixed(1))}g Protein`;
const formatIngredients = R.compose(
  R.join('\n  '),
  R.map(formatIngredient),
);
const sumProp = (prop, objs) => R.sum(R.map(R.propOr(0, prop), objs));

const mealBreakdown = R.pipe(
  R.toPairs(),
  R.filter(x => x[1].length),
  R.map(([m, i]) => `${green(startCase(m))}\n  ${formatIngredients(i)}`),
  R.join('\n'),
)(meals);

const mealTotals = R.pipe(
  R.toPairs(),
  R.map(([k, v]) => ({
    name: startCase(k),
    kcal: sumProp('kcal', v),
    carbs: sumProp('carbs', v),
    fat: sumProp('fat', v),
    protein: sumProp('protein', v),
  })),
  R.map(formatIngredient),
  R.join('\n'),
)(meals);

const dailyReport = R.pipe(
  R.values(),
  R.reduce(
    (acc, cur) =>
      R.compose(
        R.tap(obj => (obj.name = 'Daily Totals')),
        R.mergeAll,
        R.map(p => ({ [p]: R.propOr(0, p, acc) + sumProp(p, cur) })),
      )(['kcal', 'carbs', 'fat', 'protein']),
    {},
  ),
  formatIngredient,
)(meals);

console.log(mealBreakdown);
console.log('\n');
console.log(mealTotals);
console.log('\n');
console.log(dailyReport);
