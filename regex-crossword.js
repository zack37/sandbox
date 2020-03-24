// Const rows = [/[^XZVCHFJLQM]+/, /[^PZVJG]{4}(.)[EFUG]{6}\1[^\sPZVJI]{2}/, /[^\sPQFB]{7}[^MGVAJNZ\s]+[^MVZJ]/, /N[OYSRU]{5}[NICE]{6}\s\-/, /.A[A\sDL]{4}O[AECLV\s]+/];
// const cols = [/\sA?(SA|PE|N\s){2}/];
const rows = [/HE|LL|O+/, /[PLEASE]+/];
const cols = [/[^SPEAK]+/, /EP|IP|EF/];
const alpha = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
  ' ',
  '.',
];

const result = [];

for (var row = 0; row < rows.length; row++) {
  for (var col = 0; col < cols.length; col++) {
    result.push(alpha.find(a => rows[row].test(a) && cols[col].test(a)));
  }
}

console.log(result);
