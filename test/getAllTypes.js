import test from 'ava';
import isomorphicValidation from '../index';

test('get initial type', t => {
  let type = {'required': {validator: /^.+$/}};
  let iv = new isomorphicValidation(type);
  t.same(iv.getAllTypes(), type);
});

test('get type when overwrite', t => {
  let type = {'required': {validator: /^.+$/}};
  let type2 = {'required': {validator: v => !!v}};
  let iv = new isomorphicValidation(type);
  // overwrite required
  iv.addValidation(type2);

  t.same(iv.getAllTypes(), type2);
});

test('get types when adding a new one', t => {
  let type = {'required': {validator: /^.+$/}};
  let type2 = {'required2': {validator: v => !!v}};
  let iv = new isomorphicValidation(type);
  // add required2
  iv.addValidation(type2);

  t.same(iv.getAllTypes(), Object.assign(type, type2));
});
