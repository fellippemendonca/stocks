'use strinct';

const express = require('express'),
  bodyParser = require('body-parser'),
  config = require('./app/config'),
  log = require('./app/initializers').log,
  Router = require('./app/controllers/Router'),


app = express();
app.use(bodyParser.json());


// APP INITIALIZER
app.config = config.development; 

// ROUTER APP CONFIG INITIALIZER;
let router = new Router(app);
router.init();

app.use('/', router.get());

app.listen(app.config.port, () => {
  log.info(`app listening on port ${app.config.port}`);
  
  console.log(`app listening on port ${app.config.port}`)
});
