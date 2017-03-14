const _ = require('lodash');
const path = require('path');
const compression = require('compression');
const serveStatic = require('serve-static');
const helmet = require('helmet');
const session = require('cookie-session')

const setHeaders = (res, path) => {
	if (serveStatic.mime.lookup(path) === 'text/html') {
		// Custom Cache-Control for HTML files
		res.setHeader('Cache-Control', 'public, max-age=0')
	}
};

class HttpServer {
	constructor(app, wss, dirname) {
		this.dist = path.resolve(dirname, '../../public');
		console.log(`STATIC FILES ${this.dist}`);
		this.app = app.use(serveStatic(this.dist, {
			maxAge: '1d',
			setHeaders
		})).use(compression()).use(helmet());
		this.wss = wss;
		this.app.disable('x-powered-by');
		var expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
		this.app.use(session({
			name: 'session',
			keys: ['key1', 'key2'],
			cookie: {
				secure: true,
				httpOnly: true,
				expires: expiryDate
			}
		}));
	}
}

module.exports = HttpServer;