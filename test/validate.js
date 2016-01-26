import test from 'ava';
import isomorphicValidation from '../index';

test('validate success', t => {
  let type = {'required': {validator: /^.+$/}};
  let iv = new isomorphicValidation(type);

  return iv.validate({
    name: 'name',
    value: 'huei',
    type: 'required'
  }).then(() => t.pass())
  .catch(() => t.fail());
});

test('validate success with multiple form', t => {
  let type = {'required': {validator: /^.+$/}};
  let iv = new isomorphicValidation(type);

  return iv.validate({
    name: 'name',
    value: 'huei',
    type: 'required'
  },{
    name: 'gender',
    value: 'male',
    type: 'required'
  }).then(() => t.pass())
  .catch(() => t.fail());
});

test('validate fail', t => {
  let type = {'required': {validator: /^.+$/}};
  let iv = new isomorphicValidation(type);

  return iv.validate({
    name: 'name',
    value: '',
    type: 'required'
  }).then(() => t.fail())
  .catch(() => t.pass());
});

test('validate with one fail', t => {
  let type = {'required': {validator: /^.+$/}};
  let iv = new isomorphicValidation(type);

  return iv.validate([{
    name: 'name',
    value: 'huei',
    type: 'required'
  },{
    name: 'gender',
    value: '',
    type: 'required'
  }]).then(() => t.fail())
  .catch((v) => {
    t.same({name: 'gender', value:'',type:'required'},v);
    t.pass()});
});

test('validate with function', t => {
  let type = {'required': {validator: v => !!v}};
  let iv = new isomorphicValidation(type);

  return iv.validate({
    name: 'name',
    value: 'huei',
    type: 'required'
  },{
    name: 'gender',
    value: 'male',
    type: 'required'
  }).then(() => t.pass())
  .catch(() => t.fail());
});

test('validate with function promise', t => {
  let type = {'required': {validator: v => {
    return new Promise( (resolve, reject) => {
      if (v) {
        resolve();
      } else {
        reject();
      }
    });
  }}};
  let iv = new isomorphicValidation(type);

  return iv.validate({
    name: 'name',
    value: 'huei',
    type: 'required'
  }).then((v) => t.pass())
  .catch((v) => t.fail());
});
