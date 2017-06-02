/*!
 * load-request-from-cwd-or-npm | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/load-request-from-cwd-or-npm
*/
'use strict';

const loadFromCwdOrNpm = require('load-from-cwd-or-npm');

const promise = loadFromCwdOrNpm('request');

module.exports = function loadRequestFromCwdOrNpm() {
  return promise;
};
