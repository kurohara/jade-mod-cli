/**
 * index.js
 * part of jade4jsp, the sample modifier for jade.
 * Written by "Hiroyoshi Kurohara<kurohara@yk.rim.or.jp>".
 *
 * This source code is based on 'jade'(http://jade-lang.com) and 'jade-php'.
 * 'jade-php' is written by "Vinicius Wrubleski <vinicius.wrubleski@gmail.com>".
 */
module.exports = function (jade) {
    require('./lib/compiler')(jade);
};
