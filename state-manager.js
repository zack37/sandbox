const { Map, fromJS } = require('immutable');

let store = new Map();

function set(name, state) {
  if (store.has(name)) {
    const currentState = store.get(name);
    store = store.set(name, currentState.mergeDeep(fromJS(state)));
  } else {
    store = store.set(name, fromJS(state));
  }
}

function get(name) {
  return store.get(name).toJS();
}

module.exports = {
  get,
  set,
};

set('initial', {});
console.log(get('initial'));

set('initial', { a: 1 });
console.log(get('initial'));

set('initial', { a: 2, b: 1 });
console.log(get('initial'));

set('secondary', { blah: 12 });
console.log(get('initial'), get('secondary'));
console.log(store);
