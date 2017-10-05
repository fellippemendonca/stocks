'use strict';

const stockValidForm = require('./stockValidForm');

function Stock(obj) {
  
  stockValidForm(obj);

  this.id = obj.id;
  this.name = obj.name;
  this.currentPrice = Number(obj.currentPrice.toFixed(3));
  this.lastUpdate = obj.lastUpdate;
};

module.exports = Stock;
