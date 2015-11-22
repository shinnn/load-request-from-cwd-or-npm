'use strict';

var path = require('path');

var test = require('tape');

test('loadFromCwdOrNpm() with broken npm CLI', function(t) {
  t.plan(1);

  process.env.PATH = path.resolve('test/fixtures');
  var loadRequestFromCwdOrNpm = require('..');

  loadRequestFromCwdOrNpm().then(t.fail, function(err) {
    t.strictEqual(
      /Install "request" and try again\. \(npm install request\)$/.test(err.message),
      true,
      'should fail when npm CLI is not installed correctly.'
    );
  }).catch(t.fail);
});
