'use strict';

const colors = require('colors');
const env = process.env.NODE_ENV || 'development';

const nyan = {
	log: function () {
		console.log(` ,------,
 |   /\\_/\\
~|__( ^ .^)
   ""  ""`.green)
		console.log(...arguments);
	},
	info: function () {
		console.info(` ,------,
 |   /\\_/\\
~|__( O .o)
   ""  ""`.blue)
		console.info(...arguments);
	},
	error: function () {
		console.info(` ,------,
 |   /\\_/\\
~|__( X .x)
   ""  ""`.red)
		console.error(...arguments);
	}
};

module.exports = {
	log: function () {
		if (env === 'development') {
			nyan.log(...arguments);
		}
	},
	info: function () {
		(env === 'development' ? nyan : console).info(...arguments);
	},
	error: function () {
		(env === 'development' ? nyan : console).error(...arguments);
	}
};
