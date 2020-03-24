const characterMap = {
  '#': ':hash:',
  '?': ':question:',
  '0': ':zero:',
  '1': ':one:',
  '2': ':two:',
  '3': ':three:',
  '4': ':four:',
  '5': ':five:',
  '6': ':six:',
  '7': ':seven:',
  '8': ':eight:',
  '9': ':nine:',
};
const isLetter = x => /[a-z]+/i.test(x);

// User input from command line
const s = process.argv[2];

const emojize = input =>
  isLetter(input)
    ? `:regional_indicator_${input.toLowerCase()}:`
    : characterMap[input] || input;

const result = s
  .split(/\s+/)
  .map(words =>
    words
      .split('')
      .map(emojize)
      .join(' '),
  )
  .join('   ');
process.stdout.write(result);
