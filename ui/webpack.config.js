const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCss = new ExtractTextPlugin('vendors.css');
const extractSass = new ExtractTextPlugin('the-deep.css');

module.exports = {
	entry: path.resolve(__dirname, './src/app.js'),
	output: {
		filename: 'the-deep.js',
		path: path.resolve(__dirname, '../public')
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: extractCss.extract({
				use: 'css-loader',
				fallback: 'style-loader'
			})
		}, {
			test: /\.scss$/,
			use: extractSass.extract({
				fallback: 'style-loader',
				use: ['css-loader', 'sass-loader']
			})
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'The Deep'
		}),
		extractCss,
		extractSass
	]
};
