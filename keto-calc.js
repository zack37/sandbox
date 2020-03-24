#! /usr/bin/env node

const assert = require('assert');
const program = require('commander');
const mapValues = require('lodash/fp/mapValues');

function calculateMacros({
  totalCalories,
  weight,
  carbs = 30,
  proteinRatio = 0.95,
}) {
  const proteinG = proteinRatio * weight;
  const caloriesInProtein = proteinG * 4;
  const carbsG = carbs;
  const caloriesInCarbs = carbsG * 4;
  const caloriesInFat = totalCalories - caloriesInCarbs - caloriesInProtein;
  const fatG = caloriesInFat / 9;

  const getRatio = c => Number((c / totalCalories).toFixed(4)) * 100;

  return {
    protein: {
      calories: caloriesInProtein,
      grams: Math.round(proteinG),
      ratio: getRatio(caloriesInProtein),
    },
    carbs: {
      calories: caloriesInCarbs,
      grams: Math.round(carbsG),
      ratio: getRatio(caloriesInCarbs),
    },
    fat: {
      calories: caloriesInFat,
      grams: Math.round(fatG),
      ratio: getRatio(caloriesInFat),
    },
  };
}

const formatMacros = mapValues(o => ({
  grams: `${o.grams} g`,
  calories: `${o.calories} kcal`,
  ratio: `${o.ratio}%`,
}));

program
  .version('0.1.0')
  .option('-w, --weight <weight>', 'Your current weight.', Number.parseFloat)
  .option(
    '-t, --total-calories <totalCalories>',
    'Total number of calories.',
    Number.parseInt,
  )
  .option(
    '-c, --carbs [carbs]',
    'Total grams of carbs allowed. Defaults to 30.',
    Number.parseInt,
  )
  .option(
    '-p, --protein-ratio [ratio]',
    'Ratio of protein:pound. Defaults to 0.95',
    Number.parseFloat,
  )
  .parse(process.argv);

const { weight, totalCalories, carbs, proteinRatio } = program;

assert(weight, 'Weight is a required parameter');
assert(totalCalories, 'Total Calories is a required parameter');
assert(
  carbs === undefined || typeof carbs === 'number',
  'Carbs, if provided, must be a number',
);
assert(
  proteinRatio === undefined || typeof proteinRatio === 'number',
  'Protein Ratio, if provided, must be a number',
);

const macros = calculateMacros({
  weight,
  totalCalories,
  carbs,
  proteinRatio,
});

console.table(formatMacros(macros));
