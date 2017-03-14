'use strict';

const _ = require('lodash');
const subscriptions = require('../subscriptions');

const routingHandlers = [{
	test: /"authToken":\s?"(\w+)"/,
	handle: (data, matches, ws, publisher) => {
		const authToken = matches[1];
		// TODO: get user profile by authToken
		console.log(authToken);
		return true;
	}
},{
	test: /^\*:/,
	handle: (data, matches, ws, publisher) => {
		publisher.publish(subscriptions.GLOBAL, JSON.stringify({
			from: ws.id,
			by: new Date(),
			data
		}));
		return false;
	}
}, {
	test: /^#(\w+):/,
	handle: (data, matches, ws, publisher) => {
		let to = matches[1];
		publisher.publish(subscriptions.PRIVATE, JSON.stringify({
			from: ws.id,
			to,
			by: new Date(),
			data
		}));
		return false;
	}
}, {
	test: /^.(\w+):/,
	handle: (data, matches, ws, publisher) => {
		let group = matches[1];
		publisher.publish(subscriptions.GROUP, JSON.stringify({
			from: ws.id,
			group,
			by: new Date(),
			data
		}));
		return false;
	}
}];

module.exports = {
	route: (route, data, ws, publisher) => {
		_.reduce(routingHandlers, (next, handler) => {
			if (next) {
				let matches = handler.test.exec(route);
				if (matches > 0) {
					next = !!handler.handle(data, matches, ws, publisher);
				}
			}
			return next;
		}, true);
	},
	handle: (wspool, channel, messageString) => {
		const message = JSON.parse(messageString);
		switch (channel) {
			case subscriptions.GLOBAL: {
				_.forEach(wspool, (ws, id) => {
					if (message.from !== id) {
						ws.send(messageString);
					}
				});
				break;
			}
			case subscriptions.GROUP: {
				// TODO: find group in wspool
				_.forEach(wspool, (ws, id) => {
					if (message.from !== id) {
						ws.send(messageString);
					}
				});
				break;
			}
			case subscriptions.PRIVATE: {
				(wspool[message.to] || _.noop).send(JSON.stringify(messageString));
				break;
			}
			default:
				console.log('Unhandled message');
		}
	}
};
