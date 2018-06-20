'use strict';

const loadFromCwdOrNpm = require('load-from-cwd-or-npm');

const promise = loadFromCwdOrNpm('request');

module.exports = async function loadRequestFromCwdOrNpm() {
	return promise;
};
