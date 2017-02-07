const cluster = require('cluster');
const PORT = process.env.PORT || 3000;

if (cluster.isMaster) {
	const Master = require('./web/Master');
	var master = new Master();
	master.workers.forEach(_ => _.log());
} else {
	const Slave = require('./web/Slave');
	new Slave(PORT, (_, message) => _.send(`echo: ${message}`));
}
