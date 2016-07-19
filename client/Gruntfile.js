module.exports = function(grunt) {

    require("matchdep").filterAll("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks("grunt-webpack");
    var webpack = require("webpack");
    var webpackConfig = require("./js/webpack.config.js");

    // 1. Вся настройка находится здесь
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        webpack: {
            options: webpackConfig,
            build: {
                plugins: webpackConfig.plugins.concat(
                    new webpack.DefinePlugin({
                        "process.env": {
                            // This has effect on the react lib size
                            "NODE_ENV": JSON.stringify("production")
                        }
                    }),
                    new webpack.optimize.UglifyJsPlugin()
                )
            },
            "build-dev": {
                devtool: "cheap-inline-module-source-map",
                debug: true
            }
        },
        "webpack-dev-server": {
          options: {
            webpack: webpackConfig,
            publicPath: "/" + webpackConfig.output.publicPath
          },
          start: {
            keepAlive: true,
            webpack: {
              devtool: "eval",
              debug: true
            }
          }
        }
    });
  
    grunt.registerTask("dev", ["webpack:build-dev", "watch:app"]);

    // Production build
    grunt.registerTask("build", ["webpack:build"]);

};
