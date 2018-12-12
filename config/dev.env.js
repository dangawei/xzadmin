'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	NODE_ENV: '"development"',
  	API_ROOT:'"http://192.168.0.154:8082"'
	// API_ROOT:'"http://www.xuzhistudy.com"'
})