import test from 'ava';
import { Some, None } from '../option';

test('returns inner value for Some option type', t => {
  const option = Some(5);

  t.is(option.unwrap(), 5);
});

test('throws Error for None option type', t => {
  const option = None();

  t.throws(() => option.unwrap(), 'called `Option#unwrap` on a `none` value');
});
