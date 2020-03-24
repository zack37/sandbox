import test from 'ava';
import * as sinon from 'sinon';
import { Some, None } from '../option';

test('returns inner value for Some option type', t => {
  const fake = sinon.fake.returns(10);
  const option = Some(5);

  t.is(option.unwrapOrElse(fake), 5);
});

test('returns value of default value function for None option type', t => {
  const fake = sinon.fake.returns(10);
  const option = None();

  t.is(option.unwrapOrElse(fake), 10);
  t.true(fake.called);
});
