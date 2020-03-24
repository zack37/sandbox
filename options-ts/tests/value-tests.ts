import test from 'ava';
import { Some, None } from '../option';

test('throws error for `None` option type', t => {
  const option = None();
  t.throws(() => option.value, 'cannot get a `none` value');
});

test('returns wrapped value for `Some` option type', t => {
  const option = Some(5);
  t.is(option.value, 5);
});
