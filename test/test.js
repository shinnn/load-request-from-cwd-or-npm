'use strict';

var assert = require('assert');
var http = require('http');

var loadRequestFromCwdOrNpm = require('..');
var test = require('tape');

test('loadFromCwdOrNpm()', function(t) {
  t.plan(2);

  t.strictEqual(loadRequestFromCwdOrNpm.name, 'loadRequestFromCwdOrNpm', 'should have a function name.');

  var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end('{"a": 1}');
  }).listen(8124);

  loadRequestFromCwdOrNpm().then(function(request) {
    request.get('http://localhost:8124', {json: true}, function(err, res, body) {
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
