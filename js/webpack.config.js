
const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require('webpack');

module.exports = {
    entry: "./index",
    output: {
        filename: "build.js",
        library: "index"
    },

    watch: NODE_ENV === "development",

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: NODE_ENV === "development"? "cheap-inline-module-source-map": null,

    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV),
            LANG: JSON.stringify('ru')
        }),
        new webpack.ProvidePlugin({
            _: "underscore"
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