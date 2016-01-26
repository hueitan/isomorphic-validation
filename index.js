'use strict';

class isomorphicValidation {
  constructor(types) {
    this._types = types || {};
  }

  // adding one:
  // addValidation({'required': {validator: /^.+$/}})
  // adding multiples:
  // addValidation({'required': {validator: /^.+$/}, age: {validator: /\d+/}})
  // adding function:
  // addValidation({'required': {validator: (v) => !!v})
  addValidation(types) {
    return Object.assign(this._types, types);
  }

  // return type
  getAllTypes() {
    return this._types;
  }

  // validate form(s)
  // validate({
  //   name: 'name',
  //   value: 'huei',
  //   type: 'required'
  // })
  // return Promise
  validate(form) {
    let promise = [];

    if (!Array.isArray(form)) {
      form = [form];
    }

    form.forEach(v => {
      promise.push(new Promise((resolve, reject) => {
        let type = this._types[v.type];
        let validator = type && type.validator;

        // undefined validator type
        if (validator === undefined) {
          reject(`${v.type} is not defined`);
        }

        // regex check & function check
        if (validator instanceof RegExp) {
          if (validator.test(v.value)) {
            resolve(v);
          } else {
            reject(v);
          }
        } else if (typeof validator === 'function') {
          if(validator(v.value)) {
            resolve(v);
          } else {
            reject(v);
          }
        }

      }));
    })
    return Promise.all(promise);
  }
}

// https://github.com/nodejs/node/issues/2954
// SyntaxError: Unexpected reserved word when exporting a class in Node v4.0.0
// I would like to have export isomorphicValidation;
module.exports = isomorphicValidation;
