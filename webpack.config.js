
const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require('webpack');
require('es6-promise').polyfill();

module.exports = {
    entry: "./client/js/index",
    output: {
        filename: "./client/js/build.js",
        library: "index"
    },

    devtool: NODE_ENV === "development"? "cheap-inline-module-source-map": null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        })
    ],

    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['','.js']
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['','.js']
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel'
            },
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.css$/,
                loader: "style!css"
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            }
        ]
    }
};

if (NODE_ENV === 'production'){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    );
}
