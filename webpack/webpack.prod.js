require('dotenv').config();

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const helpers = require('../helpers');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const VENDOR_LIBS = [
    'axios', 'babel-polyfill', 'bluebird', 'bootstrap', 'bootstrap-loader',
    'bootstrap-sass', 'jquery', 'jquery-ui', 'material-ui', 'react', 
    'react-addons-css-transition-group', 'react-bootstrap', 'react-dom', 'react-redux',
    'react-router-dom', 'react-tap-event-plugin', 'redux', 'redux-form', 'redux-logger', 'redux-promise'
];

module.exports = webpackMerge(commonConfig, {
    entry: {
        bundle: ['babel-polyfill', './client/index.js'],
        vendor: VENDOR_LIBS
    },
    output: {
        path: helpers.root('dist'),
        filename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    plugins: [
        new ProgressBarPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new CleanWebpackPlugin(['dist'], {
            root: helpers.root(),
            verbose: true,
            watch: true
        }),
        new HtmlWebpackPlugin({
            template: './client/index.prod.html'
        }),
        new CopyWebpackPlugin([{
            from: helpers.root('./client/images'),
            to: helpers.root('dist/images')
        }]),
        new ImageminPlugin({
            disable: process.env.NODE_ENV !== 'production',
            test: /\.(jpe?g|png|gif|svg)$/i,
            pngquant: {
                quality: '95-100'
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
});