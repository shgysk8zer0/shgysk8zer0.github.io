const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './js/index.js',
    output: {
        path: __dirname,
        filename: 'js/index.min.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['env'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, sourceMap: true})
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map'
};
