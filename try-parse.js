JSON.tryParse = (text, reviver, onError) => {
  if (typeof reviver === 'function' && arguments.length === 2) {
    onError = reviver;
    reviver = null;
  }

  try {
    return JSON.parse(text, reviver);
  } catch (e) {
    return onError && onError(e);
  }
};

console.log(JSON.tryParse('{"a": 1, "b": 2}'));
console.log(JSON.tryParse('[1, 2, 3,]'));
