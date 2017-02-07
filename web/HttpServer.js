const path = require('path');
const express = require('express');
const serveStatic = require('serve-static');

const setCustomCacheControl = (res, path) => {
	if (serveStatic.mime.lookup(path) === 'text/html') {
		// Custom Cache-Control for HTML files
		res.setHeader('Cache-Control', 'public, max-age=0')
	}
};

class HttpServer {
	constructor(dirname) {
		this.app = express();
		this.app.use(serveStatic(path.join(dirname, 'public')));
		this.app.use(function (req, res) {
			res.send({ msg: __dirname });
		});
	}

	get server(){
		return this.app;
	}
}

module.exports = HttpServer;