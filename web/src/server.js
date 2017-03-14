const cluster = require('cluster');
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const redisUrl = process.env.REDIS_URL;
const logger = require('./utils/logger');

if (cluster.isMaster && env === 'production') {
	const Master = require('./Master');
	new Master().workers.forEach(_ => _.log());
} else {
	const app = require('express')();
	const http = require('http');
	const server = http.createServer(app);

	const redis = require('redis');
	const publisher = redis.createClient(redisUrl);
	const subscriber = redis.createClient(redisUrl);

	const messageRouter = require('./messaging/router');

	let wspool = {};
	const WssServer = require('./WssServer');
	let wssServer = new WssServer(server, {
		onconnection: ws => {
			wspool[ws.id] = ws;
		},
		onmessage: (ws, message) => {
			let data = {};
			try {
				data = JSON.parse(message.substring(message.indexOf(':') + 1));
			}
			finally {
				messageRouter.route(message, data, ws, publisher);
			}
		},
		onclose: ws => {
			delete wspool[ws.id];
		}
	});

	const _ = require('lodash');
	const subscriptions = require('./subscriptions');
	_.forEach(subscriptions, s => subscriber.subscribe(s));
	subscriber.on('message', (channel, messageString) => {
		messageRouter.handle(wspool, channel, messageString);
	});

	const HttpServer = require('./HttpServer');

	const bodyParser = require('body-parser')
	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json())

	let httpServer = new HttpServer(app, wssServer, __dirname);

	app.use('/live', require('./api/live')(publisher, subscriber));

	server.listen(port, () => logger.log(`listening port ${port}...`));
}
