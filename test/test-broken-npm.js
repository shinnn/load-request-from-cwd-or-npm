'use strict';

const path = require('path');

const test = require('tape');

test('loadRequestFromCwdOrNpm() with broken npm CLI', t => {
  t.plan(1);

  process.env.PATH = path.resolve('test/fixtures');
  const loadRequestFromCwdOrNpm = require('..');

  loadRequestFromCwdOrNpm().then(t.fail, ({message}) => {
    t.strictEqual(
      message.includes('Install "request" and try again. (`npm install request`)'),
      true,
      'should fail when npm CLI is not installed correctly.'
    );
  }).catch(t.fail);
});
