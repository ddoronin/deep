const _ = require('lodash');
const path = require('path');
const serveStatic = require('serve-static');

const setHeaders = (res, path) => {
	if (serveStatic.mime.lookup(path) === 'text/html') {
		// Custom Cache-Control for HTML files
		res.setHeader('Cache-Control', 'public, max-age=0')
	}
};

class HttpServer {
	constructor(app, wss, dirname) {
		this.dist = path.join(dirname, 'public');
		this.app = app.use(serveStatic(this.dist, {
			maxAge: '1d',
			setHeaders
		}));
		this.wss = wss;
	}
}

module.exports = HttpServer;