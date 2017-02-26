const pretty = require('prettyjson');
const _ = require('lodash');
const logger = process.env.NODE_ENV === 'development' ? console : {
	log: _.noop,
	debug: _.noop,
	info: _.noop,
	error: _.noop
};

module.exports = class Worker {
	constructor(cpu, worker) {
		this.cpu = cpu;
		this.worker = worker;
	}

	log() {
		Worker.print(this.cpu, this.worker, logger);
	}

	static print(cpu, worker, logger) {
		worker.on('online', () => {
			logger.log(`+ Worker PID ${worker.process.pid} is online`);
		}).on('message', (message) => {
			logger.log(`> Worker PID ${worker.process.pid} received a message`);
			logger.log(pretty.render(message));
		}).on('exit', () => {
			logger.log(`- Worker PID ${worker.process.pid} exited`);
		}).on('disconnect', () => {
			logger.log(`! Worker PID ${worker.process.pid} disconnected`);
		});
		logger.log(`-- cluster fork -->\n\r${pretty.render(cpu)}`);
	}
};
