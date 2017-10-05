'use strict';

const express = require('express');
const config = require('../config');
const parse = require('./request').parse;
const dao = require('../initializers').dao;
const log = require('../initializers').log;



function Router(app) {
  this._app = app;
  this.router = express.Router();
};

Router.prototype.init = function() {
  
  self = this;
  
  // GET​ ​ /api/stocks​​ ​ (get​ ​ a ​ ​ list​ ​ of​ ​ stocks)
  self.router.get(self._app.config.defaultPath + '/stocks', (req, res) => {

    let request = parse(req);

    dao.list()
      .then(response => {
 
        res.status(200);
        res.send(response);

        log.info({ request: request, response: res.statusMessage });
        
      })
      .catch(error => {
        
        res.status(404);
        res.send(error.message);

        log.error({ request: request, response: res.statusMessage, error: error.message });

      });
  });
  
  // GET​ ​ /api/stocks/1​​ ​ (get​ ​ one​ ​ stock​ ​ from​ ​ the​ ​ list)
  self.router.get(self._app.config.defaultPath + '/stocks/:id', (req, res) => {

    let request = parse(req);

    dao.get(request.params.id)
      .then(response => {

        res.status(200);
        res.send(response);

        log.info({ request: request, response: res.statusMessage });
      
      })
      .catch(error => {

        res.status(404);
        res.send(error.message);

        log.error({ request: request, response: res.statusMessage, error: error.message });
      
      });
  });
  
  // PUT​ ​ /api/stocks/1​​ ​ (update​ ​ the​ ​ price​ ​ of​ ​ a ​ ​ single​ ​ stock)
  self.router.put(self._app.config.defaultPath + '/stocks/:id', (req, res) => { 

    let request = parse(req);

    dao.update(request.params.id, request.body.currentPrice)
      .then(response => {

        res.status(200);
        res.send(response);

        log.info({ request: request, response: res.statusMessage });

      })
      .catch(error => {
        
        res.status(400);
        res.send(error.message);

        log.error({ request: request, response: res.statusMessage, error: error.message });
      
      });
  });

  // POST​ ​ /api/stocks​​ ​ (create​ ​ a ​ ​ stock)  
  self.router.post(self._app.config.defaultPath + '/stocks', (req, res) => {

    let request = parse(req);

    dao.create(request.body)
      .then(response => {

        res.status(201);
        res.send(response);

        log.info({ request: request, response: res.statusMessage });

      })
      .catch(error => {

        res.status(400);
        res.send(error.message);

        log.error({ request: request, response: res.statusMessage, error: error.message });

      });
  });
  
};

Router.prototype.get = function() {
  self = this;
  return self.router;
};

module.exports = Router;
