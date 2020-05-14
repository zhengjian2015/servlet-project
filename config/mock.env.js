'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./mock.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"mock"'
})
