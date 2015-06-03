module.exports = {


  friendlyName: 'Coerce',


  description: 'Coerce a value against the given type schema.',


  extendedDescription: 'If coercion is impossible for the value or its properties (recursive), default to the base value for the type.',


  moreInfoUrl: 'https://github.com/node-machine/rttc#coerceexpectedtypeschema-actualvalue',


  cacheable: true,


  sync: true,


  inputs: {

    value: {
      friendlyName: 'Value',
      description: 'The value to coerce.',
      example: '===',
      required: true
    },

    typeSchema: {
      friendlyName: 'Type schema',
      description: 'The type schema to coerce against.',
      example: '*',
      required: true
    }

  },


  exits: {

    success: {
      variableName: 'coerced',
      description: 'Returns the coerced value.',
      example: '==='
    }

  },


  fn: function (inputs,exits) {
    var rttc = require('rttc');

    var coerced = rttc.coerce(inputs.typeSchema, inputs.value);
    return exits.success(coerced);
  },



};
