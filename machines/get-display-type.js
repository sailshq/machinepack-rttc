module.exports = {


  friendlyName: 'Get display type',


  description: 'Given a value, return its type as a human-readable string.',


  extendedDescription: 'Note that this is not limited to rttc types-- it can return strings like "Error" and "Date".',


  cacheable: true,


  sync: true,


  inputs: {

    value: {
      friendlyName: 'Value',
      example: '==='
    }

  },


  exits: {

    success: {
      variableName: 'displayType',
      example: 'array'
    },

  },


  fn: function (inputs,exits) {
    var rttc = require('rttc');

    var displayType = rttc.getDisplayType(inputs.value);
    return exits.success(displayType);
  },



};
