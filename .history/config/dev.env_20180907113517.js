'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const config = require('../config')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"http://testc.appscomm.cn"',
  //BASE_API: '"http://localhost:9528"',
  BASE_API: '"http://localhost:"' +config.dev.port,
})
