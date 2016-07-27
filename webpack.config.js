module.exports = {
    entry: "./js/index",
    output: {
        path: __dirname,
        filename: "./js/build.js"
    },
    devtool : 'source-map',

    resolve: {
        modulesDirectories: "node_modules"
    },


    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'es2016', 'stage-0']
                }
            },
            {test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/}
        ]
    }
};
