'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const useEnv = require('./use.env')

module.exports = merge(prodEnv,useEnv, {
	NODE_ENV: '"development"',
  	API_ROOT:'"http://192.168.0.101:8082"'
})
