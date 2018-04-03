const { Observable } = require('rxjs');
const readline = require('readline');
const questions = require('./leadership-questionnaire-questions');
const { bold, red, yellow, green } = require('chalk');
const joi = require('joi');
const startCase = require('lodash/startCase');
const R = require('ramda');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const answerSchema = joi
  .number()
  .integer()
  .min(1)
  .max(5);
const getColor = R.cond([
  [R.lte(R.__, 16), red],
  [R.lte(R.__, 20), yellow],
  [R.T, green],
]);
const format = R.compose(
  R.join('\n'),
  R.map(([category, score]) => `${category}: ${score}`),
  R.map(([category, score]) => [startCase(category), getColor(score)]),
  R.toPairs
);
const ask = Observable.bindCallback(rl.question.bind(rl));

console.clear();

console.log(`
Below is a list of statements about your interpersonal skills. Using the 1-5
scale provided, rate each statement based on the degree to which it describes your actions or behaviors
in your job. Check ${bold('one')} number that represents your rating.

    ${bold(1)} - Strongly Disagree    ${bold(2)} - Disagree    ${bold(3)} - Undecided/Uncertain    ${bold(4)} - Agree    ${bold(5)} - Strongly Agree
`);

Observable.from(questions)
  .concatMap(question =>
    Observable.defer(() => ask(`${question.number}. ${question.question}: `))
      .map(answer => ({
        ...question,
        answer: joi.attempt(answer, answerSchema),
      }))
      .retry(2)
  )
  .reduce(
    (acc, { answer, category }) => ({
      ...acc,
      [category]: acc[category] + answer,
    }),
    { esteem: 0, empathy: 0, involvement: 0, share: 0, support: 0 }
  )
  .subscribe({
    next: scores => {
      console.log(`
RESULTS
===============
${format(scores)}
===============
      `);
    },
    complete: () => rl.close(),
    error: error => {
      console.error(
        red(
          'Why is this so hard for you? You have to answer with 1-5. Get it right, dummy'
        )
      );
      console.error(red(error));
      rl.close();
    },
  });
