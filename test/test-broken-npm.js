'use strict';

const path = require('path');

const test = require('tape');

test('loadFromCwdOrNpm() with broken npm CLI', t => {
  t.plan(1);

  process.env.PATH = path.resolve('test/fixtures');
  const loadRequestFromCwdOrNpm = require('..');

  loadRequestFromCwdOrNpm().then(t.fail, err => {
    t.strictEqual(
      err.message.includes('Install "request" and try again. (npm install request)'),
      true,
      'should fail when npm CLI is not installed correctly.'
    );
  }).catch(t.fail);
});
