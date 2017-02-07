const cluster = require('cluster');
const PORT = process.env.PORT || 9000;

if (cluster.isMaster) {
	const Master = require('./web/Master');
	var master = new Master();
	master.workers.forEach(_ => _.log());
} else {
	const HttpServer = require('./web/HttpServer');
	const server = new HttpServer(__dirname).server;
	const Slave = require('./web/Slave');
	new Slave(server, (_, message) => _.send(`echo: ${message}`));
	server.listen(PORT);
}
