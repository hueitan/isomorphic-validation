import test from 'ava';
import isomorphicValidation from '../index';

test('adding to overwrite', t => {
  let type = {'required': {validator: /^.+$/}};
  let type2 = {'required': {validator: v => !!v}};
  let iv = new isomorphicValidation(type);
  // overwrite required
  iv.addValidation(type2);

  t.same(iv._types, type2);
});

test('adding a new one', t => {
  let type = {'required': {validator: /^.+$/}};
  let type2 = {'required2': {validator: v => !!v}};
  let iv = new isomorphicValidation(type);
  // add required2
  iv.addValidation(type2);

  t.same(iv._types, Object.assign(type, type2));
});
