module.exports = {


  friendlyName: 'Infer',


  description: 'Infer the type schema from the provided example value.',


  cacheable: true,


  sync: true,


  inputs: {

    example: {
      friendlyName: 'Example',
      description: 'The example value to infer a type schema for.',
      extendedDescription: 'This example value must be JSON-compatible, and should contain no heterogeneous or multi-item arrays.',
      example: '*',
      required: true
    }

  },


  exits: {

    success: {
      variableName: 'typeSchema',
      description: 'Returns a type schema which represents the provided example value.',
      example: '*'
    }

  },


  fn: function (inputs,exits) {
    var rttc = require('rttc');
    return exits.success(rttc.infer(inputs.example));
  }


};
