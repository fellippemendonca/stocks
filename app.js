'use strict';

const express = require('express'),
  Requests = require('./test/Requests'),
  bodyParser = require('body-parser'),
  config = require('./app/config'),
  log = require('./app/initializers').log,
  Router = require('./app/controllers/Router'),


app = express();
app.use(bodyParser.json());


// APP ENV INITIALIZER
app.config = config;

// ROUTER APP ENV INITIALIZER;
let router = new Router(app);
router.init();

app.use('/', router.get());

app.listen(app.config.port, () => {

  log.info(`app listening on port ${app.config.port}`);
  console.log(`app listening on port ${app.config.port}`);

  let testRequests = new Requests(app);

  testRequests.getAll();
  testRequests.getOne();

});
