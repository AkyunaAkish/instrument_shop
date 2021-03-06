require('dotenv').config();

const webpackMerge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const commonConfig = require('./webpack.common.js');
const helpers = require('../helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    entry: {
        bundle: ['babel-polyfill', './client/index.js']
    },
    output: {
        path: helpers.root('dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new WebpackNotifierPlugin({
            alwaysNotify: true
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './client',
        proxy: {
            '*': {
                target: `http://localhost:${process.env.PORT}`,
                secure: false
            }
        }
    }
});