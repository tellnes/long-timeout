const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    filename: 'longTimeout.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'LongTimeout',
    libraryTarget: 'umd',
  },
};
