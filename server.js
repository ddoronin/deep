const cluster = require('cluster');
if (cluster.isMaster) {
	const Master = require('./web/Master');
	var master = new Master();
	master.workers.forEach(_ => _.log());
} else {
	const Slave = require('./web/Slave');
	new Slave(8080, (_, message) => _.send(`echo: ${message}`));
}
