import test from 'ava';
import isomorphicValidation from '../index';

test('init type should be null', t => {
  let iv = new isomorphicValidation();
  t.same(iv._types, {});
});

test('init given type required', t => {
  let type = {'required': {validator: /^.+$/}};
  let iv = new isomorphicValidation(type);
  t.same(iv._types, type);
});
