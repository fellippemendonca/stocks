'use strict';

const log = require('../initializers').log;


module.exports = { parse: parse };

function parse(req) {
  let reqObj = new Object;

  try {
    
    reqObj.params = JSON.parse(JSON.stringify(req.params));
    reqObj.query = JSON.parse(JSON.stringify(req.query));
    reqObj.body = JSON.parse(JSON.stringify(req.body));
    return reqObj;  

  } catch (error) {
    log.error({ function: 'request.parse', error: error.message });
    return reqObj;
  }
  
};
