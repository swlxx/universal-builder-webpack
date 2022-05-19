const path = require('path');
const glob = require('glob');

global.console.log(glob.sync(path.join(__dirname, './src/*/index.js').replace(/\\/g, '/')));
