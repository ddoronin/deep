const WebSocket = require('ws');
const uuid = require('node-uuid');
const logger = console;

class WssServer {
	constructor(server, eventBus) {
		const wss = new WebSocket.Server({
			perMessageDeflate: false,
			clientTracking: true,
			server
		});
		wss.on('connection', ws => {
			ws.id = uuid.v4();
			logger.log(`connection ${ws.id}`);
			eventBus.onconnection(ws);
			ws.on('close', () => {
				logger.log(`close ${ws.id}`);
				eventBus.onclose(ws);
			}).on('error', () => {
				logger.error(`error ${ws.id}`);
			}).on('message', (message) => {
				logger.info(message);
				eventBus.onmessage(ws, message);
			});
		});
		return wss;
	}
}

module.exports = WssServer;
