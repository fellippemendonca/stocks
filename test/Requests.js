'use strict';

const request = require('supertest');
const bunyan = require('bunyan');
const logTest = bunyan.createLogger({
  name: "stocksTest",
  streams: [{ path: 'log/stocks.log' }]
});


function Requests(app) {
  this._app = app;
};



Requests.prototype.getAll = async function() {
  
  self = this;

  return await request(self._app)
  .get('/api/stocks')
  .expect('Content-Type', /json/)
  .expect(200)
  .then((res) => {
    logTest.info({ function: 'Requests.getAll', activity: `Test Succeeded` });
    return true;
  })
  .catch(err => {
    logTest.error({ function: 'Requests.getAll', activity: `Test Failed`, error: err.message });
    return false;
  });
};

Requests.prototype.getOne = async function() {
  
  self = this;

  return await request(self._app)
  .get('/api/stocks/1')
  .expect('Content-Type', /json/)
  .expect(200)
  .then((res) => {
    logTest.info({ function: 'Requests.getOne', activity: `Test Succeeded` });
    return true;
  })
  .catch(err => {
    logTest.error({ function: 'Requests.getOne', activity: `Test Failed`, error: err.message });
    return false;
  });
};


module.exports = Requests;
