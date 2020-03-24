import test from 'ava';
import { Some, None } from '../option';

test('returns a Some option with the result of mapping function for Some option type', t => {
  const option = Some('Hello, World!');

  t.deepEqual(option.map(x => x.length), Some(13));
});

test('returns None option type for None option type', t => {
  const option = None();

  t.deepEqual(option.map(x => x.length), None());
});
