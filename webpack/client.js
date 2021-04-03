const path = require('path');

const {createBasicConfig} = require('./shared');

const isClient = true;
module.exports = createBasicConfig(isClient);
