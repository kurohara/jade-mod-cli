#!/usr/bin/env node
/**
 * jademod.js
 */

var hookData = {
  jade: null,
  doModify: function(jade) {
    if (jade && this['modifiers']) {
      var modifiers = this['modifiers'];
      for (var index in modifiers) {
        modifiers[index].init(jade);
      }
    }
  },
  doRestore: function() {
    // I think this is not needed to be implemented...
  }
};

//
// replace 'require' function.
var yor = require('yorequire');
yor.set(function(name, orig_require, data) {
  var module = orig_require(name);
  if (name === 'jade' || name === '../') {
    data.jade = module;
    // may be unnecessaly.
    data.doModify(module);
  } else if (name === 'commander') {
    module.option('-M, --modifier <modifier>', 'specify the name of modifier(multi)', function(val, arr) {arr.push(val);return arr;}, []);
    //
    // replace Command.parse() function.
    if (! data.parse_orig) {
      data.parse_orig = module.Command.prototype.parse;
    }
    module.Command.prototype.hookData = data;
    module.Command.prototype.parse = function(argv) {
      this.hookData.parse_orig.bind(this)(argv);
      if (this.modifier /* from command line */) {
        // load each modifiers
        this.hookData.modifiers = [];
        for (var index in this.modifier) {
          var modobj = orig_require(this.modifier[index]);
          if (modobj) {
            this.hookData.modifiers.push(orig_require(this.modifier[index]));
          } else {
            console.log("Failed to load modifier[" + this.modifier[index] + "].");
          }
        }
        // try to apply modifiers.
        this.hookData.doModify(this.hookData.jade);
      }
    };
  }
  return module;
}, hookData);

yor.enable(true);

//
// run the jade cli.
require('../node_modules/jade/bin/jade');

