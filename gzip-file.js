const fs = require('fs');
const { Transform } = require('stream');
const zlib = require('zlib');

const bigFile = fs.createWriteStream('./big.file.txt');
for (var i = 0; i <= 5e1; i++) {
  bigFile.write(
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n'
  );
}
bigFile.end();

const reportProgress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.');
    callback(null, chunk);
  }
});

const file = './big.file.txt';
fs
  .createReadStream(file)
  .pipe(zlib.createGzip())
  .pipe(reportProgress)
  .pipe(fs.createWriteStream(file + '.gz'))
  .on('finish', () => console.log('finished gzipping'));
