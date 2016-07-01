/*!
 * load-request-from-cwd-or-npm | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/load-request-from-cwd-or-npm
*/
'use strict';

const loadFromCwdOrNpm = require('load-from-cwd-or-npm');

const loadRequest = loadFromCwdOrNpm('request').catch(err => {
  if (err && err.code === 'MODULE_NOT_FOUND') {
    err.message += ' Install "request" and try again. (npm install request)';
  }

  return Promise.reject(err);
});

module.exports = function loadRequestFromCwdOrNpm() {
  return loadRequest;
};
