'use strict';

function stockValidForm(obj) {
  try {

    checkIf(obj, 'id', 'number');
    checkIf(obj, 'name', 'string');
    checkIf(obj, 'currentPrice', 'number');
    checkIf(obj, 'lastUpdate', 'object');

  } catch (error) {
    throw error;
  }
};

module.exports = stockValidForm;

function checkIf(object, property, type) {
  if (typeof object === 'object') {
    if (typeof object[property] !== type) {
      throw new Error(`The type of ${property} is not ${type} as required`);
    }
  } else {
    throw new Error(`Object not found`);
  }
};