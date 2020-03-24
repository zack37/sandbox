import test from 'ava';
import { Some, None } from '../option';

test('returns inner value for Some option type', t => {
  const option = Some(5);

  t.is(option.unwrapOr(10), 5);
});

test('return default value for None option type', t => {
  const option = None();

  t.is(option.unwrapOr('default'), 'default');
});
