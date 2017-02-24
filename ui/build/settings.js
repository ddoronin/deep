'use strict';

const path = require('path');

const envs = {
	DEV: 'dev',
	DIST: 'dist',
	TEST: 'test'
};

const paths = {
	src: path.resolve(__dirname, '../src'),
	test: path.resolve(__dirname, '../test'),
	public: path.resolve(__dirname, '../assets'),
	dest: path.resolve(__dirname, '../../public')
};

const PORT = 8000;

module.exports = {PORT, envs, paths};
