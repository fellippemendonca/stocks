'use strict';

const config = {
  
  development: {
    port: 3001,
    defaultPath: '/api'
  },
  test: {
    port: 3001,
    defaultPath: '/api'
  },
  production: {
    port: 3001,
    defaultPath: '/api'
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
