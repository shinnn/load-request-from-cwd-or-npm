'use strict';

const path = require('path');

const test = require('tape');

test('loadFromCwdOrNpm() with no npm CLI', t => {
  t.plan(1);

  process.env.PATH = path.resolve('n/p/m/_/d/o/e/s/_/n/o/t/_/e/x/i/s/t/_/i/n/_/t/h/i/s/_p/a/t/h');
  const loadRequestFromCwdOrNpm = require('..');

  loadRequestFromCwdOrNpm().then(t.fail, err => {
    t.strictEqual(
      err.message,
      'not found: npm',
      'should fail when npm CLI is not installed.'
    );
  }).catch(t.fail);
});
