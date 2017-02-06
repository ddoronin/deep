const cluster = require('cluster');
const os = require('os');
const Worker = require('./Worker');

module.exports = class Master {
	constructor() {
		this._workers = this._createWorkers();
	}

	_createWorkers() {
		return os.cpus().map(_ => new Worker(_, cluster.fork()));
	}

	get workers() {
		return this._workers;
	}
};
