//const path = require('path');
module.exports = {
    mode: 'development',
    entry: ['./utils.js','./app.js'],
    output: {
        filename: 'bundle.js'
    },
    watch: true,

    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                    cache: true,
                    failOnError: true,
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.js','.es6']
    }
}