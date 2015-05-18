/**
 * modifier.js
 * part of jade4asp, the sample modifier for jade.
 * Written by "Hiroyoshi Kurohara<kurohara@yk.rim.or.jp>".
 *
 */

//
// subclasses for jade classes.
var Compiler = function Compiler() { };

var Lexer = function Lexer() { };

var Parser = function Parser() { };

/**
 * make copy of self to temporary parent.
 * then make itself subclass.
 */
function selfsubclass(self, tmpparent) {
	for (var key in self.prototype) {
		tmpparent.prototype[key] = self.prototype[key];
	}
    self.prototype.super = tmpparent.prototype;
}

function hasParent(jade) {
	return jade.Compiler.super;
}

function isParentOurs(jade) {
	return jade.Compiler.super == Compiler.prototype;
}


//
// The Modifier Class.
var Modifier = function Modifier() {
	this.Compiler = Compiler;
	this.Lexer = Lexer;
	this.Parser = Parser;
};

Modifier.prototype.Modifier = Modifier;

Modifier.prototype.override = function(jade) {

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

Modifier.prototype.init = function(jade) {
	this.jade = jade;
	if (!hasParent(jade) || !isParentOurs(jade)) {
		selfsubclass(jade.Compiler, Compiler);
		selfsubclass(jade.Lexer, Lexer);
		selfsubclass(jade.Parser, Parser);
	
		this.override(jade);
	}
};

Modifier.prototype.restore = function() {
	[ 'Compiler', 'Lexer', 'Parser' ].forEach(function(objname) {
		for (var key in this.jade[objname].prototype) {
			this.jade[objname].prototype[key] = this.jade[objname].prototype.super[key];
		}
	}.bind(this));
};
 
module.exports = new Modifier();
