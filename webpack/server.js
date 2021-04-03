const path = require('path');

const {createBasicConfig} = require('./shared');

const isClient = false;
module.exports = createBasicConfig(isClient);
