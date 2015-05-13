/**
 * compiler.js
 * part of jade4jsp, the sample modifier for jade.
 * Written by "Hiroyoshi Kurohara<kurohara@yk.rim.or.jp>".
 *
 * This source code is based on 'jade'(http://jade-lang.com) and 'jade-php'.
 * 'jade-php' is written by "Vinicius Wrubleski <vinicius.wrubleski@gmail.com>".
 */

module.exports = function (jade) {
    // for debug purpose
    var sys = require('sys');

    //
    // I incorporate the rule of naming the original function holder, "ex_*", because this is the protocol I decided.
    // This naming rule is used by consuming tools such like grunt tasks.
    if (! jade.Compiler.prototype.ex_visitCode) {
        jade.Compiler.prototype.ex_visitCode = jade.Compiler.prototype.visitCode;
        jade.Lexer.prototype.ex_code = jade.Lexer.prototype.code;
    }

    var isConstant = require('constantinople');
    if (!jade) {
        jade = require('jade');
    }

    var characterParser = require('character-parser');

    function assertExpression(exp) {
        // this verifies that a JavaScript expression is valid
        // Fix this for php
        return true;
    }

    function assertNestingCorrect(exp) {
        //this verifies that code is properly nested, but allows
        //invalid JavaScript such as the contents of `attributes`
        var res = characterParser(exp)
        if (res.isNesting()) {
            throw new Error('Nesting must match on expression `' + exp + '`')
        }
    }
    
    jade.Lexer.prototype.code = function () {
        var captures;
        if (captures = /^(!?=|-)[ \t]*([^\n]+)/.exec(this.input)) {
            this.consume(captures[0].length);
            var flags = captures[1];
            captures[1] = captures[2];
            var tok = this.tok('code', captures[1]);
            tok.flags = flags;
            tok.escape = flags.charAt(0) === '=';
            tok.buffer = flags.charAt(0) === '=' || flags.charAt(1) === '=';
            if (tok.buffer) assertExpression(captures[1])
            return tok;
        }
    };


    jade.Compiler.prototype.visitCode = function (code) {
        var val = code.val;

        if (this.pp) {
          this.prettyIndent(1, true);
        }
        this.buffer('<% ' + val + ' %>', false);

        if (code.block) {
            if (!code.buffer) this.buf.push('{');
            this.visit(code.block);
            if (!code.buffer) this.buf.push('}');
        }
    };

};
