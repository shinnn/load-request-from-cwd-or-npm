'use strict';

const path = require('path');

const test = require('tape');

test('loadRequestFromCwdOrNpm() with no npm CLI', t => {
  t.plan(1);

  process.env.PATH = path.resolve('n/p/m/_/d/o/e/s/_/n/o/t/_/e/x/i/s/t/_/i/n/_/t/h/i/s/_p/a/t/h');
  const loadRequestFromCwdOrNpm = require('..');

  loadRequestFromCwdOrNpm().then(t.fail, err => {
    t.strictEqual(
      err.message,
      `Failed to load "request" module from the current working directory (${
        process.cwd()
      }). Install "request" and try again. (\`npm install request\`)`,
      'should fail when npm CLI is not installed.'
    );
  }).catch(t.fail);
});
