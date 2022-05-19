const glob = require('glob-all')

describe('Checking genersted html files', () => {
  it('Shoule generate css js files', done => {
    const files = glob.sync([
      './dist/index_*.js',
      './dist/index_*.css',
      './dist/search_*.js',
      './dist/search_*.css',
    ])
    if (files.length > 0) {
      done()
    } else {
      throw new Error('No css js files generated')
    }
  });
});
