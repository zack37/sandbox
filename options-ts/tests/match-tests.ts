import test from 'ava';
import * as sinon from 'sinon';
import { Some, None } from '../option';

test('calls some arm for `Some` option type', t => {
  const someFake = sinon.fake();
  const noneFake = sinon.fake.throws(new Error('None branch called'));
  const option = Some(5);
  option.match({
    Some: someFake,
    None: noneFake,
  });

  t.true(someFake.called);
  t.false(noneFake.called);
});

test('passes inner value for `Some` option type', t => {
  const someFake = sinon.fake();
  const noneFake = sinon.fake.throws(new Error('None branch called'));
  const option = Some(5);

  option.match({
    Some: someFake,
    None: noneFake,
  });

  t.is(someFake.lastCall.lastArg, 5);
});

test('returns result of some branch for `Some` option type', t => {
  const someFake = sinon.fake.returns(10);
  const noneFake = sinon.fake.throws(new Error('None branch called'));
  const option = Some(5);
  const result = option.match({
    Some: someFake,
    None: noneFake,
  });

  t.is(result, 10);
});

test('calls none arm for `None` option type', t => {
  const someFake = sinon.fake.throws(new Error('Some branch called'));
  const noneFake = sinon.fake();
  const option = None();

  option.match({
    Some: someFake,
    None: noneFake,
  });

  t.false(someFake.called);
  t.true(noneFake.called);
});

test('does not pass inner value for `None` option type', t => {
  const someFake = sinon.fake.throws(new Error('Some branch called'));
  const noneFake = sinon.fake();
  const option = None();

  option.match({
    Some: someFake,
    None: noneFake,
  });

  t.is(noneFake.lastCall.lastArg, undefined);
});

test('returns result of none branch for `None` option type', t => {
  const someFake = sinon.fake.throws(new Error('Some branch called'));
  const noneFake = sinon.fake.returns(10);
  const option = None();
  const result = option.match({
    Some: someFake,
    None: noneFake,
  });

  t.is(result, 10);
});
