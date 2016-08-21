require('es6-promise').polyfill();

module.exports = {
    entry: "./client/js/index",
    output: {
    path: __dirname +"/client/js",
        filename: "build.js"
    },
    devtool: 'source-map',
    module: {
        loaders: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel',
              query: {presets: ['es2015', 'es2016']}
          },
          {
            test: /\.ejs$/,
            loader: 'ejs-loader'
          },
          {
            test: /\.css$/,
            loader: "style!css"
          }
        ]
    }
};
