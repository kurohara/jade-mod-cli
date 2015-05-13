#!/usr/bin/env node
/**
 * jademod.js
 */

/**
 * Function to restore original functions.
 *
 */
var clearJadeModifiers = function (obj) {
  if (obj) {
    // write back original functions.
    [ "Parser", "Compiler", "Lexer" ].forEach(function(component) {
      for (var key in obj[component].prototype) {
        if (key.lastIndexOf('ex_', 0) === 0) {
          obj[component].prototype[key.substring(3)] = obj[component].prototype[key];
        }
      }
    });
  }
};

var hookData = {
  jade: null,
  doModify: function(jade) {
    if (jade && this['modifiers']) {
      clearJadeModifiers(jade);
      var modifiers = this['modifiers'];
      for (var index in modifiers) {
        modifiers[index](jade);
      }
    }
  }
};

//
// replace 'require' function.
var yor = require('yorequire');
yor.setCB(function(name, orig_require, data) {
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
    module.Command.prototype.hookData = hookData;
    module.Command.prototype.parse = function(argv) {
      this.hookData.parse_orig.bind(this)(argv);
      if (this.modifier) {
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

yor.enable(false);

