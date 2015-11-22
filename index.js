/*!
 * load-request-from-cwd-or-npm | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/load-request-from-cwd-or-npm
*/
'use strict';

var PinkiePromise = require('pinkie-promise');
var loadFromCwdOrNpm = require('load-from-cwd-or-npm');

var loadRequest = loadFromCwdOrNpm('request').catch(function modifyError(err) {
  if (err && err.code === 'MODULE_NOT_FOUND') {
    err.message += ' Install "request" and try again. (npm install request)';
  }

  return PinkiePromise.reject(err);
});

module.exports = function loadRequestFromCwdOrNpm() {
  return loadRequest;
};
