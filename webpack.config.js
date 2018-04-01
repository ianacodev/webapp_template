const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const SplitChunksPlugin = require('webpack/lib/optimize/SplitChunksPlugin');

// html plugin options.
const htmlOptions = {
    template: path.join(__dirname, 'index.html'),
    inject: 'body',
    hash: true
}

// paths to clean on prior to build.
const pathsToClean = [
    'dist'
];

// clean options.
const cleanOptions = {
    root: __dirname,
    verbose: true
}

// split chunks.
const splitChunksOptions = {
    chunks: "all",
    minSize: 3000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true,
    cacheGroups: {
        vendor: {
            name: 'chunk',
            test: /[\\/]node_modules[\\/]/
        }
    }
};

module.exports = {
    devtool: 'cheap-eval-source-map', 
    context: path.join(__dirname, 'src'),
    entry: {
        // entry point here
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            interpolate: true
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            plugins: () => [
                                require('autoprefixer')
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(htmlOptions),
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new SplitChunksPlugin(splitChunksOptions),
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin(),
        new MiniCssExtractPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 9001,
        clientLogLevel: '', // none
        https: false,
        inline: true,
        open: false
    }
}