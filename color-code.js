const alfy = require('alfy');

// Returns { red, green, blue }
function hexToRGB(hex) {
  const [r, g, b] = [hex.substr(0, 2), hex.substr(2, 2), hex.substr(4, 2)];

  const red = Number.parseInt(r, 16);
  const green = Number.parseInt(g, 16);
  const blue = Number.parseInt(b, 16);

  return `${red} ${green} ${blue}`;
}

function rgbToHex(rgb) {
  const hex = rgb
    .split(/\s+/)
    .map(Number)
    .map(c => c.toString(16).padStart(2, 0))
    .join('')
    .toUpperCase();

  return `#${hex}`;
}

const HEX_PATTERN = /\#?([A-F0-9]{6})/i;
const RGB_PATTERN = /\d{1,3}\s+\d{1,3}\s+\d{1,3}/;

function parse(input) {
  const hexGroups = HEX_PATTERN.exec(input);
  if (hexGroups) {
    return hexToRGB(hexGroups[1]);
  }

  if (RGB_PATTERN.test(input)) {
    return rgbToHex(input);
  }

  return `Unknown Input: ${input}`;
}

alfy.log(alfy.input);

const output = parse(alfy.input);
alfy.output([{ title: output, arg: output }]);
