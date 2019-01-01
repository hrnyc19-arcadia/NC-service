var webpack = require('webpack');
var path = require('path');

var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${SRC_DIR}\\app.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  // plugins: [    
  //     new webpack.ProvidePlugin({
  //       $: 'jquery',
  //       jQuery: 'jquery',
  //       'window.jQuery': 'jquery',
  //       Popper: ['popper.js', 'default'],          
  //     })    
  // ],
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }

    ]
  }
};