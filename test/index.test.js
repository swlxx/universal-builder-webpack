const path = require('path');

process.chdir(path.join(__dirname, 'smoke/template'));

describe('universal-builder-webpack test case', () => {
  require('./unit/webpack.base.test');
});
