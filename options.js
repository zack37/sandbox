/* eslint-disable new-cap */
const joi = require('joi');

const armSchema = joi.object({
  is: joi
    .string()
    .required()
    .valid('Some', 'None', '_'),
  guard: joi.func(),
  expr: joi
    .func()
    .required()
    .maxArity(1),
});

const armsSchema = joi
  .array()
  .min(1)
  .items(armSchema);

function assertCovers(arms, type) {
  const coversCase = arms.some(x => x.is === type || x.is === '_');
  if (!coversCase) {
    throw new Error(`pattern \`${type}\` not covered`);
  }
}
const rootProperty = {
  writable: false,
  enumerable: false,
  configurable: false,
};

class Some extends Option {
  isSome() {
    return true;
  }

  isNone() {
    return false;
  }
}

class None extends Option {
  isSome() {
    return false;
  }

  isNone() {
    return true;
  }
}

class Option {
  constructor(/*{ isSome, isNone, value }*/ value) {
    Object.defineProperties(this, {
      // isSome: { ...rootProperty, value: () => isSome },
      // isNone: { ...rootProperty, value: () => isNone },
      _value: { ...rootProperty, value },
    });
  }

  // static some(value) {
  //   // return new Option({ isSome: true, isNone: false, value });
  //   return new Some(value);
  // }

  // static none() {
  //   // return new Option({ isSome: false, isNone: true });
  //   return new None();
  // }

  get value() {
    if (this.isNone()) {
      throw new Error('cannot get a `none` value');
    }

    return this._value;
  }

  match({ Some, None }) {
    return this.isSome() ? Some(this._value) : None();
  }

  expect(msg) {
    return this.match({
      Some: value => value,
      None: () => {
        throw new Error(msg);
      },
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
      None: () => defFn(),
    });
  }

  map(fn) {
    return this.match({
      Some: value => new Some(fn(value)),
      None: () => new None(),
    });
  }

  mapOr(def, fn) {
    return this.match({
      Some: value => fn(value),
      None: () => def,
    });
  }

  mapOrElse(defFn, fn) {
    return this.match({
      Some: value => fn(value),
      None: defFn,
    });
  }

  *iter() {
    yield this;
  }

  and(optB) {
    return this.match({
      Some: () => optB,
      None: new None(),
    });
  }

  andThen(fn) {
    return this.match({
      Some: value => fn(value),
      None: () => new None(),
    });
  }

  or(optB) {
    return this.match({
      Some: value => new Some(value),
      None: () => optB,
    });
  }

  orElse(fn) {
    return this.match({
      Some: value => new Some(value),
      None: () => fn(),
    });
  }

  matchN(arms) {
    joi.assert(arms, armsSchema);
    assertCovers(arms, 'None');
    assertCovers(arms, 'Some');

    const type = this.isSome() ? 'Some' : 'None';
    const armMatches = arm => {
      if (arm.is === '_') {
        return true;
      }
      const isType = arm.is === type;
      const hasGuard = Boolean(arm.guard);
      return isType && (!hasGuard || arm.guard(this._value));
    };
    const matchedArm = arms.find(armMatches);

    if (!matchedArm) {
      const errorMessage =
        'non exhaustive list of matches. Try adding `_` at the end';
      throw new Error(errorMessage);
    }

    return matchedArm.expr(this._value);
  }
}

module.exports = {
  some: value => new Some(value),
  none: () => new None(),
  from: value =>
    value === null || value === undefined ? new None() : new Some(value),
};
