module.exports = {


  friendlyName: 'Validate (strict)',


  description: 'Validate a value against a type schema.',


  cacheable: true,


  sync: true,


  inputs: {

    value: {
      friendlyName: 'Value',
      description: 'The actual value to validate.',
      example: '===',
      required: true
    },

    typeSchema: {
      friendlyName: 'Type schema',
      description: 'The expected type schema.',
      example: '*',
      required: true
    }

  },


  exits: {

    invalid: {
      description: 'The value is invalid against the provided schema.',
      example: [{
        code: 'E_INVALID_TYPE',
        keypath: 'foo.bar.0.baz',
        expected: '*',
        actual: '==='
      }]
    },

    success: {
      friendlyName: 'valid',
      description: 'Valid.'
    }

  },


  fn: function (inputs,exits) {
    var _ = require('lodash');
    var rttc = require('rttc');

    try {
      rttc.validateStrict(inputs.typeSchema, inputs.value);
    }
    catch (e) {
      // Generally, the is E_INVALID_TYPE.
      if (e.code === 'E_INVALID_TYPE') {
        var errors = _.reduce(e.errors, function (memo,subErr){
          // TODO: do this in rttc itself instead of here.
          memo.push({
            code: subErr.code,
            expected: subErr.expected,
            actual: subErr.actual,
            keypath: subErr.inputKey
          });
          return memo;
        }, []);
        return exits.invalid(errors);
      }
      // Otherwise this is some unknown error.
      else return exits.error(e);
    }

    return exits.success();
  },



};
