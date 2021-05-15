const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const isDevelopment = !isProduction;
const mode = isProduction ? 'production' : 'development';

module.exports = [
    env => ({
        mode,
        name: 'frontend',
        entry: './src/frontend/index.ts',
        output: {
            filename: 'frontend.js',
            path: path.resolve(__dirname, 'public')
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.ts', '.tsx', '.hbs'],
            plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, 'tsconfig.json') })]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true
                            }
                        }
                    ]
                }
            ]
        },
        target: 'web',
        plugins: [
            new HtmlWebpackPlugin({
                filename: './index.html',
                template: './src/frontend/index.hbs',
            }),
            new WebpackBar({ name: 'Frontend', }),
            new CleanWebpackPlugin(),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    configFile: path.resolve(__dirname, 'tsconfig.json')
                },
                logger: { issues: 'webpack-infrastructure' }
            }),
        ],
        stats: 'none',
    }),
    env => ({
        mode,
        name: 'backend',
        entry: './src/backend/index.ts',
        output: {
            filename: 'backend.js',
            path: path.resolve(__dirname, 'dist')
        },
        devtool: 'source-map',
        resolve: {
            extensions: ['.ts', '.tsx'],
            plugins: [new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, 'tsconfig.json') })]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'ts-loader',
                            options: {
                                transpileOnly: true
                            }
                        }
                    ]
                }
            ]
        },
        externalsPresets: { node: true },
        externals: [nodeExternals()],
        plugins: [
            new WebpackBar({ name: 'Backend', color: 'yellow', }),
            new CleanWebpackPlugin(),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    configFile: path.resolve(__dirname, 'tsconfig.json')
                },
                logger: { issues: 'webpack-infrastructure' }
            }),
        ],
        stats: 'none',
    })
]