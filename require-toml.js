const fs = require('fs');
const toml = require('toml');
const semver = require('semver');

const readToml = parser => (module, filename) => {
  const opts = semver.lt(process.versions.node, '0.10.0')
    ? 'utf8'
    : { encoding: 'utf8' };
  try {
    const src = fs.readFileSync(filename, opts);
    module.exports = parser.parse(src);
  }
  catch (e) {
    if (e.line && e.column) {
      throw new Error(
        `Error compiling ${filename} at line ${e.line}, column ${e.column}: ${e.message}`
      );
    }
    throw e;
  }
};

function install(options = {}) {
  if (require.extensions['.toml']) {
    return;
  }

  const parser = options.toml || toml;
  require.extensions['.toml'] = readToml(parser);
}

module.exports = {
  install
};
