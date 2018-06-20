'use strict';

const {createServer} = require('http');
const {join, resolve} = require('path');

const test = require('tape');
const clearAllModules = require('clear-module').all;

delete process.env.npm_execpath;

test('loadRequestFromCwdOrNpm()', async t => {
	t.plan(1);

	const loadRequestFromCwdOrNpm = require('..');

	const server = createServer((req, res) => {
		res.writeHead(200, {'Content-Type': ''});
		res.end(Buffer.from('1'));
	}).listen(8124);

	const request = await loadRequestFromCwdOrNpm();
	request.get('http://localhost:8124', {encoding: 'utf8'})
	.on('data', data => t.equal(data, '1', 'should load a valid `request` module.'))
	.on('end', () => server.close());
});

test('loadRequestFromCwdOrNpm() with broken npm CLI', async t => {
	t.plan(1);

	clearAllModules();

	process.env.PATH = join(__dirname, 'fixtures');
	const loadRequestFromCwdOrNpm = require('..');

	try {
		await loadRequestFromCwdOrNpm();
	} catch ({message}) {
		t.equal(
			message.includes('Install "request" and try again. (`npm install request`)'),
			true,
			'should fail when npm CLI is not installed correctly.'
		);
	}
});

test('loadRequestFromCwdOrNpm() with no npm CLI', async t => {
	t.plan(1);

	clearAllModules();

	process.env.PATH = resolve('n/p/m/_/d/o/e/s/_/n/o/t/_/e/x/i/s/t/_/i/n/_/t/h/i/s/_p/a/t/h');
	const loadRequestFromCwdOrNpm = require('..');

	try {
		await loadRequestFromCwdOrNpm();
	} catch ({message}) {
		t.equal(
			message,
			`Failed to load "request" module from the current working directory (${
				process.cwd()
			}). Install "request" and try again. (\`npm install request\`)`,
			'should fail when npm CLI is not installed.'
		);
	}
});
