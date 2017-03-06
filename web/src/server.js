const cluster = require('cluster');
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

if (cluster.isMaster && env !== 'development') {
	const Master = require('./Master');
	new Master().workers.forEach(_ => _.log());
} else {
	const app = require('express')();
	const http = require('http');
	const server = http.createServer(app);

	const WssServer = require('./WssServer');
	let wssServer = new WssServer(server, (_, message) => _.send(`echo: ${message}`));

	const HttpServer = require('./HttpServer');
	let httpServer = new HttpServer(app, wssServer, __dirname);
	server.listen(port, () => console.log(`listening port ${port}...`));
}
