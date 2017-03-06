'use strict';

const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const WebpackDevServer = require('webpack-dev-server');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const open = require('open');

const uiDevPort = 8080;
const webPort = process.env.PORT || 3000;

config.plugins = config.plugins.concat([new ProgressBarPlugin()]);

let server = new WebpackDevServer(webpack(Object.assign(config)), {
	contentBase: path.join(__dirname, './src'),
	historyApiFallback: false,
	hot: false,
	port: uiDevPort,
	noInfo: false,
	proxy: {
		'/api': {
			target: `http://localhost:${webPort}`,
			pathRewrite: {'^/api': ''}
		}
	}
});

// Listen to front-end changes
server.listen(uiDevPort, 'localhost', (err) => {
	if (err) {
		return console.log(err);
	}
	console.log('Listening at localhost:' + uiDevPort);
	console.log('Opening your system browser...');
	open('http://localhost:' + uiDevPort + '/webpack-dev-server/');
});
