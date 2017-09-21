const joi = require('joi');

const armSchema = joi.object({
  is: joi
    .string()
    .required()
    .valid('Some', 'None', '_'),
  guard: joi.func().arity(1),
  expr: joi
    .func()
    .required()
    .arity(1)
});

const armsSchema = joi
  .array()
  .min(1)
  .items(armSchema);

const isSomeSymbol = Symbol('isSome');
const isNoneSymbol = Symbol('isNone');

function assertCovers(arms, type) {
  const coversCase = arms.some(x => x.is === type || x.is === '_');
  if (!coversCase) {
    throw new Error(`pattern \`${type}\` not covered`);
  }
}
const rootProperty = {
  writable: false,
  enumerable: false,
  configurable: false
};

class Option {
  constructor({ isSome, isNone, value }) {
    Object.defineProperties(this, {
      isSome: Object.assign({}, rootProperty, { value: () => isSome }),
      isNone: Object.assign({}, rootProperty, { value: () => isNone }),
      _value: Object.assign({}, rootProperty, { value })
    });
  }

  get value() {
    if (this.isNone()) {
      throw new Error('cannot get a `none` value');
    }

    return this._value;
  }

  isSome() {
    return this[isSomeSymbol];
  }

  isNone() {
    return this[isNoneSymbol];
  }

  match({ Some, None }) {
    return this.isSome() ? Some(this._value) : None();
  }

  expect(msg) {
    return this.match({
      Some: value => value,
      None: () => {
        throw new Error(msg);
      }
    });
  }

  unwrap() {
    return this.expect('called `Option#unwrap()` on a `none` value');
  }

  unwrapOr(def) {
    return this.match({ Some: value => value, None: () => def });
  }

  unwrapOrElse(defFn) {
    return this.match({
      Some: value => value,
      None: () => defFn()
    });
  }

  map(fn) {
    return this.match({
      Some: value => Option.some(fn(value)),
      None: () => Option.none()
    });
  }

  mapOr(def, fn) {
    return this.match({
      Some: value => fn(value),
      None: () => def
    });
  }

  mapOrElse(defFn, fn) {
    return this.match({
      Some: value => fn(value),
      None: defFn
    });
  }

  *iter() {
    yield this;
  }

  and(optB) {
    return this.match({
      Some: () => optB,
      None: Option.none()
    });
  }

  andThen(fn) {
    return this.match({
      Some: value => fn(value),
      None: () => Option.none()
    });
  }

  or(optB) {
    return this.match({
      Some: value => Option.some(value),
      None: () => optB
    });
  }

  orElse(fn) {
    return this.match({
      Some: value => Option.some(value),
      None: () => fn()
    });
  }

  matchN(arms) {
    joi.assert(arms, armsSchema);
    assertCovers(arms, 'None');
    assertCovers(arms, 'Some');

    const type = this.isSome() ? 'Some' : 'None';
    const armMatches = a =>
      a.is === type && (a.guard && a.guard(this._value) || true);
    const matchedArm = arms.find(armMatches) || arms.find(a => a.is === '_');

    if (!matchedArm) {
      throw new Error('non exhaustive list of match arms');
    }

    return matchedArm.expression(this._value);
  }
}

module.exports = {
  some: value => new Option({ isSome: true, isNone: false, value }),
  none: () => new Option({ isSome: false, isNone: true })
};
