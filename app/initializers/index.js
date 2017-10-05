'use strict';

const bunyan = require('bunyan');
const log = bunyan.createLogger({
  name: "stocksApp",
  streams: [{ path: 'log/stocks.log' }]
});

const StocksDAO = require('../../lib/DAO/StocksDAO');

let dao = new StocksDAO();
dao.init(10); 

module.exports = { dao, log };
