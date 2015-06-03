module.exports = {


  friendlyName: 'Validate',


  description: 'Validate a value against a type schema. If it\'s close enough, coerce it to fit.',


  extendedDescription: 'Either returns a (potentially "lightly" coerced) version of the value that was accepted, or it triggers its `invalid` exit. The "light coercion" might turn "3" into 3, "true" into true, -4.5 into "-4.5", etc.',


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
      description: 'The value is invalid against the provided schema, and cannot be safely coerced to fit.',
      example: [{
        code: 'E_INVALID_TYPE',
        keypath: 'foo.bar.0.baz',
        expected: '*',
        actual: '==='
      }]
    },

    success: {
      variableName: 'validated',
      description: 'Returns the potentially lightly coerced value.',
      example: '==='
    }

  },


  fn: function (inputs,exits) {
    var _ = require('lodash');
    var rttc = require('rttc');

    var validated;
    try {
      validated = rttc.validate(inputs.typeSchema, inputs.value);
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

    return exits.success(validated);
  },



};
