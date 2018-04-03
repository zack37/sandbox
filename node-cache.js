const {
  assignIn,
  cloneDeep,
  isArray,
  isFunction,
  isNumber,
  isObject,
  isString,
  size,
  template,
} = require('lodash');
const { EventEmitter } = require('events');

const defaultOptions = {
  forceString: false,
  objectValueSize: 80,
  promiseValueSize: 80,
  arrayValueSize: 40,
  stdTTL: 0,
  checkPeriod: 600,
  useClones: true,
  errorOnMissing: false,
  deleteOnExpire: true,
};

// PRIVATE FUNCTIONS
function checkData(options, key, data) {
  let retVal = true;
  if(data.t !== 0 && data.t < Date.now()) {
    if(options.deleteOnExpire) {
      retVal = false;
      del(key);
    }
  }
}
function del(key) {

}
function isInvalidKey(key) {
  return false;
}
function check(key, obj) {
  return true;
}
function unwrap(obj) {
  return obj;
}
function error(message, opts) {
  return new Error(message);
}
// END PRIVATE FUNCTIONS

const create = (opts = {}) => {
  // initErrors();
  const data = {};
  const options = Object.assign({}, defaultOptions, opts);
  const stats = {
    hits: 0,
    misses: 0,
    keys: 0,
    ksize: 0,
    vsize: 0,
  };
  const validKeyTypes = ['string', 'number'];
  checkData();

  const api = {
    get: (key, errorOnMissing) => {
      const invalidError = isInvalidKey(key);
      if(invalidError) {
        throw invalidError;
      }

      const cachedValue = data[key];
      if(cachedValue && check(key, cachedValue)) {
        stats.hits++;
        return unwrap(cachedValue);
      }
      stats.misses++;
      if(options.errorOnMissing || errorOnMissing) {
        const err = error('ENOTFOUND', { key });
        if(err) {
          throw err;
        }
      }

      return undefined;
    },
  };

  return api;
};

module.exports = {
  create,
};
