module.exports = {


  friendlyName: 'Compile',


  description: 'Return a JavaScript code snippet which would accurately represent the given value in code.',


  moreInfoUrl: 'https://github.com/node-machine/rttc#compilevalue',


  cacheable: true,


  sync: true,


  inputs: {

    value: {
      friendlyName: 'Value',
      description: 'The value to compile.',
      example: '===',
      required: true
    }

  },


  exits: {

    success: {
      variableName: 'jsCodeString',
      description: 'Returns a JavaScript code snippet.',
      example: 'some JavaScript code'
    }

  },


  fn: function (inputs,exits) {
    var rttc = require('rttc');
    return exits.success(rttc.compile(inputs.value));
  }


};
