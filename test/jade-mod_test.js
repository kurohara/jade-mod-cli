'use strict';

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['test1'] = {
  setUp: function(done) {
    // setup here
    done();
  },
/*
  test1: function(test) {
    test.expect(1);
    // tests here
	var spawn = require('child_process').spawn;
	var jademod = spawn('bin/jademod.js', [ '--help' ], { stdio: [ 'ignore', 'pipe', 'ignore' ]});
    jademod.stdout.on('data', function(data) {
      test.ok(data.toString().indexOf("-M, --modifier") > 0);
      test.done();
    });
  },
 */
  test2: function(test) {
    var grunt = require('grunt');
    test.expect(1);
    // tests here
    var expected = grunt.file.read('test/expected/test2.asp');
    var input = grunt.file.read('test/fixtures/test2.jade');
	var spawn = require('child_process').spawn;
    var jademod = spawn('bin/jademod.js', [ '-M', '../../../test/modifiers/jade4asp' ], { stdio: [ 'pipe', 'pipe', 'ignore' ]});
    jademod.stdin.write(input);
    jademod.stdin.end();
    jademod.stdout.on('data', function(data) {
      test.equal(data.toString() + '\n', expected);
      test.done();
    });
  },
};

