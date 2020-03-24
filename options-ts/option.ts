const ident = <T>(value: T): T => value;

interface IOption<T> {
  isSome: () => boolean;
  isNone: () => boolean;
  match: <U>(args: MatchArgs<T>) => U;
  expect: (msg: string) => T;
  unwrap: () => T;
  unwrapOr: (defaultValue: T) => T;
  unwrapOrElse: (defaultFn: (() => T)) => T;
  map: <U>(mapping: ((T) => U)) => U;
}

interface MatchArgs<T> {
  Some: (value: T) => any;
  None: () => any;
}

export enum OptionType {
  Some,
  None,
  _,
}

interface Arm<T, U> {
  is: OptionType;
  guard: (value: T) => boolean;
  expr: (value: T) => U;
}

abstract class OptionImpl<T> implements IOption<T> {
  private readonly _value?: T;

  protected constructor(value?: T) {
    this._value = value;
  }

  get value() {
    if (this.isNone()) {
      throw new Error('cannot get a `none` value');
    }

    return this._value;
  }

  match<U>({ Some, None }: MatchArgs<T>): U {
    return this.isSome() ? Some(this._value as T) : None();
  }

  expect(msg: string): T {
    return this.match({
      Some: ident,
      None: () => {
        throw new Error(msg);
      },
    });
  }

  unwrap(): T {
    return this.expect('called `Option#unwrap` on a `none` value');
  }

  unwrapOr(defaultValue: T): T {
    return this.match({
      Some: ident,
      None: () => defaultValue,
    });
  }

  unwrapOrElse(defaultFn: (() => T)): T {
    return this.match({
      Some: ident,
      None: defaultFn,
    });
  }

  map<U>(projection: ((T) => U)) {
    return this.match({
      Some: value => Some(projection(value)),
      None: () => None(),
    });
  }

  mapOr<U>(defaultValue: U, projection: ((T) => U)): U {
    return this.match({
      Some: projection,
      None: () => defaultValue,
    });
  }

  mapOrElse<U>(defaultValueFn: (() => U), projection: ((T) => U)): U {
    return this.match({
      Some: projection,
      None: defaultValueFn,
    });
  }

  *iter() {
    yield this;
  }

  and<U>(optB: IOption<U>): IOption<U> {
    return this.match({
      Some: () => optB,
      None: () => None(),
    });
  }

  andThen<U>(projection: ((T) => IOption<U>)): IOption<U> {
    return this.match({
      Some: projection,
      None: () => None(),
    });
  }

  or(optB: IOption<T>): IOption<T> {
    return this.match({
      Some: Some,
      None: () => optB,
    });
  }

  orElse(fn: (() => IOption<T>)): IOption<T> {
    return this.match({
      Some: Some,
      None: fn,
    });
  }

  private static assertCovers(arms, ...types) {
    types.forEach(type => {
      const coversCase = arms.some(x => x.is === type || x.is === OptionType._);
      if (!coversCase) {
        throw new Error(`pattern \`${type}\` not covered`);
      }
    });
  }

  matchN<U>(arms: Array<Arm<T, U>>): U {
    OptionImpl.assertCovers(arms, 'None', 'Some');

    const type = this.isSome() ? OptionType.Some : OptionType.None;
    const value = this._value as T;
    const armMatches = (arm: Arm<T, U>): boolean => {
      if (arm.is === OptionType._) {
        return true;
      }

      const isType = arm.is === type;
      const hasGuard = Boolean(arm.guard);
      return isType && (!hasGuard || arm.guard(value));
    };
    const matchedArm = arms.find(armMatches);

    if (!matchedArm) {
      throw new Error(
        'none exhaustive list of matches. Try adding `_` at the end',
      );
    }

    return matchedArm.expr(value);
  }

  filter(predicate: ((T) => boolean)): IOption<T> {
    return this.match({
      Some: value => (predicate(value) ? Some(value) : None),
      None: () => None,
    });
  }

  abstract isSome(): boolean;
  abstract isNone(): boolean;
}

export class SomeImpl<T> extends OptionImpl<T> {
  constructor(value: T) {
    super(value);
  }

  isSome(): boolean {
    return true;
  }

  isNone(): boolean {
    return false;
  }
}

export class NoneImpl extends OptionImpl<any> {
  constructor() {
    super();
  }

  isSome(): boolean {
    return false;
  }

  isNone(): boolean {
    return true;
  }
}

export const Some = value => new SomeImpl(value);
export const None = () => new NoneImpl();

export function from(value) {
  return value === null || value === undefined ? None() : Some(value);
}
