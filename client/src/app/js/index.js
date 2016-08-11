require('babel-polyfill');
require('whatwg-fetch');
window.Promise = require('./bootstrapBluebird');
require('./main');
