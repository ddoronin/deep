const http = require('http');
const WebSocket = require('ws');
const redis = require('redis');
const uuid = require('node-uuid');
const subscriptions = require('./subscriptions');

const createRedisClient = () => redis.createClient(process.env.REDIS_URL);

class Slave {
	constructor(port, onmessage) {
		const wss = this._createWss(port, onmessage);
		this._createSubscriber(subscriptions.GLOBAL, wss);
	}

	_createWss(port, onmessage) {
		const publisher = createRedisClient();
		const wss = new WebSocket.Server({
			perMessageDeflate: false,
			clientTracking: true,
			port: port
		});
		wss.on('connection', (ws)=> {
			ws.id = uuid.v4();
			console.log(`connection ${ws.id}`);
			ws.on('close', () => {
				console.log(`close ${ws.id}`);
			}).on('error', () => {
				console.log(`error ${ws.id}`);
			}).on('message', (message) => {
				console.log(`message ${ws.id} -> ${message}`);
				if (message.indexOf('global:') !== -1) {
					publisher.publish(subscriptions.GLOBAL, JSON.stringify({
						ws_id: ws.id,
						data: message.replace('global:', '')
					}));
				}
				onmessage(ws, message);
			});
		});
		return wss;
	}

	_createSubscriber(subscription, wss) {
		const subscriber = createRedisClient();
		subscriber.subscribe(subscription);
		switch (subscription) {
			case subscriptions.GLOBAL:
				subscriber.on('message', (channel, message) => {
					const o = JSON.parse(message);
					wss.clients.forEach(ws => {
						if (ws.readyState === WebSocket.OPEN && o.ws_id !== ws.id) {
							ws.send(o.data);
						}
					});
				});
				break;

			case subscriptions.GROUP:
				subscriber.on('message', (channel, message) => {
					const o = JSON.parse(message);
					// TODO: find group ids by o.groupId
					const group = [];
					wss.clients.forEach(ws => {
						if (ws.readyState === WebSocket.OPEN && group.indexOf(ws.id) !== -1) {
							ws.send(o.data);
						}
					});
				});
				break;

			case subscriptions.PRIVATE:
				subscriber.on('message', (channel, message) => {
					const o = JSON.parse(message);
					// TODO: find group ids by o.userId
					const group = [];
					wss.clients.forEach(ws => {
						if (ws.readyState === WebSocket.OPEN && group.indexOf(ws.id) !== -1) {
							ws.send(o.data);
						}
					});
				});
				break;

			default:
				subscriber.on('message', (channel, message) => console.log('unhandled message'));
		}
		return subscriber;
	}
}

module.exports = Slave;
