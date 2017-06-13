JSON.tryParse = (text, reviver) => {
  try {
    return JSON.parse(text, reviver);
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

console.log(JSON.tryParse('{"a": 1, "b": 2}'));
console.log(JSON.tryParse('[1, 2, 3,]'));
