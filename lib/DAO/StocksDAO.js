'use strinct';

const bunyan = require('bunyan');
const logDAO = bunyan.createLogger({
  name: "stocksDAO",
  streams: [{ path: 'log/stocks.log' }]
});

const Stock = require('./models/Stock');



function StocksDAO() {

  this.stocksHash = {};

};

StocksDAO.prototype.init = function(nStocks) {
  
  self = this;
  
  for (let i = 0; i < nStocks; i++) { 
    let newStock = randStockGen();

    self.create(newStock)
      .then(result => {
        logDAO.info({ function: 'init', activity: `Stock: ${result.name} Generated.` });
        console.log(`Stock: ${result.name} Generated.`);
      })
      .catch(error => {
        logDAO.error({ function: 'init', error: `Problem while Generating Stocks: ${error.message}` });
        console.log(`Problem while Generating Stocks: ${error.message}`);
      });
  };

};


StocksDAO.prototype.create = async function(obj) {
  
  self = this;

  let newStock;

  try {

    obj.id = keySequence(self.stocksHash);
    obj.lastUpdate = new Date();
    
    newStock = new Stock(obj);
    
    self.stocksHash[newStock.id] = newStock;

    return await self.stocksHash[newStock.id];
  
  } catch(error) {

    logDAO.error({ function: 'create', error: error.message });
    throw error;
    
  }

};


StocksDAO.prototype.list = async function() {
  
  self = this;

  let resultList = [];

  for (let idx in self.stocksHash) {
    
    resultList.push(self.stocksHash[idx]);
  
  }

  //return await { stocks: resultList };
  return await resultList;
  
};


StocksDAO.prototype.get = async function(id) {
  
  self = this;

  try {

    return await new Stock(self.stocksHash[id]);

  } catch(error) {

    logDAO.error({ function: 'get', error: error.message });
    throw error;
    
  }
  
};


StocksDAO.prototype.update = async function(id, currentPrice) {
  
  self = this;

  try {

    let updStock = new Stock(self.stocksHash[id]);
    updStock.currentPrice = currentPrice;
    self.stocksHash[id] = new Stock(updStock);

    return await self.stocksHash[id];

  } catch(error) {

    logDAO.error({ function: 'update', error: error.message });
    throw error;
    
  }

};

module.exports = StocksDAO;



// HELPERS

function keySequence(hash) {

  let newKey = 1;

  for (let idx in hash) {

    newKey <= hash[idx].id ? 
      newKey = hash[idx].id + 1 
      : false;

  }

  return newKey;

};

function randStockGen() {

  return {
    name: `Stock-${getRandomInt(1, 100)}`,
    currentPrice: getRandomInt(1, 100)
  };

};

function getRandomInt(min, max) {

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;

};
