'use strict';

const Bluebird = require('bluebird');
require('babel-runtime/core-js/promise').default = Bluebird;

module.exports = Bluebird;
