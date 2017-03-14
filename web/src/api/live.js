'use strict';

const express = require('express');
const router = express.Router();

module.exports = (publisher, subscriber) => {
	router.get('/', (req, res) => {
		res.json({tile: 'Welcome to the live module.'});
	});

	router.post('/:channel', (req, res) => {
		const message = {
			channel: req.params.channel,
			data: JSON.stringify(req.body)
		};
		publisher.publish(message.channel, message.data);
		res.json(message);
	});

	return router;
};
