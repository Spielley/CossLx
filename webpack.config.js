const path = require('path');
const DIST_PATH = path.resolve(__dirname, 'dist');
const fs = require('fs');
const webpack = require('webpack');

module.exports = [
	{
		entry: {
			'browser-api': './src/browser-api.js'
		},
		output: {
			filename: '[name].js',
			path: DIST_PATH,
			library: ["CossLx"],
			libraryTarget: 'umd'
		},
		plugins: [
			new webpack.BannerPlugin({
				banner: fs.readFileSync('./LICENSE').toString()
			})
		],
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [
								['env', {
									targets: {
										browsers: ["last 2 versions"]
									} 
								}]
							]
						}
					}
				}
			]
		}
	}
];