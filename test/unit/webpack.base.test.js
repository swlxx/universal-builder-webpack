
const assert = require('assert');

describe('webpack.base.js test case', () => {
  const baseConfig = require('../../lib/webpack.base.js')
  it('entry', () => {
    assert.equal(baseConfig.entry.home, 'D:/Lrr/Webpack/webpack/universal-builder-webpack/test/smoke/template/src/home/index.js');
    assert.equal(baseConfig.entry.search, 'D:/Lrr/Webpack/webpack/universal-builder-webpack/test/smoke/template/src/search/index.js');
  });
});