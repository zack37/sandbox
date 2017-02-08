const assertCovers = type => {
  const coversCase = arms.filter(x => x.is === type || a.is === '_').length > 0;
  if (!coversCase) {
    throw new Error('pattern `' + type + '` not covered');
  }
};

const optionFactory = (optionBase, value) => {
  // Used to obfuscate value
  const self = Object.assign({}, optionBase, { value });
  const match = (s, n) => self.isSome() ? s() : n();
  const optionImpl = {
    expect: msg => match(() => self.value, () => {
      throw new Error(msg);
    }),
    unwrap: () => optionImpl.expect(
      'called `option#unwrap()` on a `none` value'
    ),
    unwrapOr: def => match(() => self.value, () => def),
    unwrapOrElse: fn => match(() => self.value, fn),
    map: fn => match(() => some(fn(self.value)), () => none),
    mapOr: (def, fn) => match(() => fn(self.value), () => def),
    mapOrElse: (def, fn) => match(() => fn(self.value), def),
    iter: function*() {
      yield match(() => some(self.value), () => none);
    },
    and: optB => match(() => optB, () => none),
    andThen: fn => match(() => fn(self.value), () => none),
    or: optB => match(() => some(self.value), () => none),
    orElse: optB => match(() => some(self.value), fn),
    empty: () => none,
    match,
    matchN: arms => {
      assertCovers('none');
      assertCovers('some');

      const type = self.isSome() ? 'some' : 'none';
      const matchedArm = arms.find(a => {
        return a.is === type && (a.guard && a.guard(self.value) || true);
      }) || arms.find(a => a.is === '_');

      if (!matchedArm) {
        throw new Error('non exhaustive list of arms');
      }
      return matchedArm.expression(self.value);
    }
  };
  return Object.assign(optionImpl, optionBase);
};

// API Members (Statics)
const some = module.exports.some = value => {
  const someOpt = { isSome: () => true, isNone: () => false };
  return optionFactory(someOpt, value);
};

const none = module.exports.none = (() => {
  const noneOpt = { isSome: () => false, isNone: () => true };
  return optionFactory(noneOpt);
})();

const from = module.exports.from = value => {
  return value == null ? none : some(value);
};