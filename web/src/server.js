const cluster = require('cluster');
const port = process.env.PORT || 9000;
const env = process.env.NODE_ENV || 'development';

if (cluster.isMaster && env !== 'development') {
	const Master = require('./Master');
	new Master().workers.forEach(_ => _.log());
} else {
	const app = require('express')();

	const WssServer = require('./WssServer');
	let wssServer = new WssServer(app, (_, message) => _.send(`echo: ${message}`));

	const HttpServer = require('./HttpServer');
	let httpServer = new HttpServer(...[app, wssServer, __dirname]);

	app.listen(port);
}