'use strict';

import _ from 'lodash';
import {envs} from './settings';
const supportedEnvs = _.values(envs);

function buildConfig(env) {
	if (_.indexOf(supportedEnvs, env) === -1) {
		throw new Error(`Unknown environment ${env}, the following are supported: ${supportedEnvs.join(', ')}`);
	}
	return require(`./${env}Config`);
}

module.exports = {
	buildConfig
};
