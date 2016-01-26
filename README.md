ISOMORPHIC VALIDATION [![Build Status](https://travis-ci.org/huei90/isomorphic-validation.png?branch=master)](https://travis-ci.org/huei90/isomorphic-validation)
===

An isomorphic validation engine for browser client and node app.

> **Engine** - the core engine inside the validation

Node.js
===

```
npm install --save isomorphic-validation
```

```js
import isomorphicValidation from isomorphicValidation;

const iv = new isomorphicValidation();

// implement
iv.addValidation({
  'required': {
    'validator': /^.+$/
  }
});

iv.validate({
  name: 'name',
  value: 'huei90',
  type: 'required'
})
.then((val) => console.log('form is valid'))
.catch((val) => console.log('form is invalid'));
```

Browser Client
===

[Babel](https://babeljs.io/)

Usage
===

#### Constructor

given parameter types

```js
const iv = new isomorphicValidation(types)
```

#### Adding validation type

validator type accepts `RegExp` and `Function`

```js
// adding multiples:
iv.addValidation({'required': {validator: /^.+$/}, age: {validator: /\d+/}})

// adding function:
iv.addValidation({'required': {validator: (v) => !!v})
```

type format

```js
{
  'required': { // validation type name
    'validator': /^.+$/ // validation type - RegExp or Function
  }
}
```

#### validate form

validate the form(s) and return `Promise`

```js
// validate form
iv.validate([{
    name: 'name',
    value: 'huei',
    type: 'required'
  },{
    name: 'age',
    value: 30,
    type: 'age']
  }])
  .then(/* ... */)
  .catch(/* ... */);
```

form format

```js
[{
  name: 'name', // form name
  value: 'huei', // value of the form name
  type: 'required' // type name (given in type format)
}]
```

#### return all types

```js
iv.getAllTypes(); // => all types
```

License
===

MIT
