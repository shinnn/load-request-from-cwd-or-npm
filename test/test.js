'use strict';

const assert = require('assert');
const http = require('http');

const loadRequestFromCwdOrNpm = require('..');
const test = require('tape');

test('loadFromCwdOrNpm()', t => {
  t.plan(2);

  t.strictEqual(loadRequestFromCwdOrNpm.name, 'loadRequestFromCwdOrNpm', 'should have a function name.');

  const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end('{"a": 1}');
  }).listen(8124);

  loadRequestFromCwdOrNpm().then(request => {
    request.get('http://localhost:8124', {json: true}, (err, res, body) => {
      server.close();
      assert.ifError(err);

      t.deepEqual(
        body,
        {a: 1},
        'should load a valid `request` module.'
      );
    });
  }).catch(t.fail);
});
