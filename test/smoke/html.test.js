const glob = require('glob-all')

describe('Checking genersted html files', () => {
  it('Shoule generate html files', done => {
    const files = glob.sync([
      './dist/index.html',
      './dist/search.html',
    ])
    if (files.length > 0) {
      done()
    } else {
      throw new Error('No html files generated')
    }
  });
});
