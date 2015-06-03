module.exports = {


  friendlyName: 'Sample',


  description: 'Generate some sample values that validate against the provided type schema.',


  sync: true,


  inputs: {

    typeSchema: {
      friendlyName: 'Type schema',
      description: 'The type schema to use as a CFG.',
      example: '*',
      required: true
    },

    n: {
      friendlyName: 'How many?',
      description: 'The maximum number of sample values to generate.',
      example: 2,
      defaultsTo: 2
    },

  },


  exits: {

    success: {
      variableName: 'samples',
      description: 'Returns an array of up to `n` unique sample values, in random order.',
      example: ['===']
    }

  },


  fn: function (inputs,exits) {
    var rttc = require('rttc');

    var samples = rttc.sample(inputs.typeSchema, inputs.n);
    return exits.success(samples);
  },



};
