import test from 'ava';
import { Some, None } from '../option';

test('returns inner value for Some option type', t => {
  const option = Some(5);

  t.is(option.expect('Not a some'), 5);
});

test('throws Error for None option type', t => {
  const option = None();

  t.throws(() => option.expect('Not a some'), 'Not a some');
});
