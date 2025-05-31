// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const path = require('path');

import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import path from 'path';

export default (env, argv) => ({
    mode: argv.mode || 'development',
    entry: {
        app: './src/app.ts'
    },
    output: {
        filename: argv.mode === 'production' ? '[name].[contenthash].js' : '[name].js',
        path: path.resolve(import.meta.dirname, 'dist'),
        publicPath: '/',
        clean: true
    },
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.css$/,
                use: [
                    argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][hash][ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify:
                argv.mode === 'production'
                    ? {
                          collapseWhitespace: true,
                          keepClosingSlash: true,
                          removeComments: true,
                          collapseBooleanAttributes: true
                      }
                    : false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        })
    ],
    optimization:
        argv.mode === 'production'
            ? {
                  minimizer: ['...', new CssMinimizerPlugin()]
              }
            : {},
    devServer: {
        static: {
            directory: path.resolve(import.meta.dirname, 'dist')
        },
        open: true,
        compress: true,
        hot: true,
        port: 3000
    }
});
