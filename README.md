# jade-mod
The other CLI tool for Jade template engine which is for modifying its functionality.

## Getting Started
Install the module with: `npm install jade-mod`
jademod command runs just same as jade command except it accept '--modifier' option(you can specify this option multiple times).
The only usable modifier is 'phpjade' just now.

```shell
$ npm install -g jade-mod
$ npm install --save phpjade
$ jademod --help

  Usage: jademod [options] [dir|file ...]

  Options:

    -h, --help                 output usage information
    -M, --modifier <modifier>  specify the name of modifier(multi)
    -V, --version              output the version number
    -O, --obj <str|path>       JavaScript options object or JSON file containing it
    -o, --out <dir>            output the compiled html to <dir>
    -p, --path <path>          filename used to resolve includes
    -P, --pretty               compile pretty html output
    -c, --client               compile function for client-side runtime.js
    -n, --name <str>           The name of the compiled template (requires --client)
    -D, --no-debug             compile without debugging (smaller functions)
    -w, --watch                watch files for changes and automatically re-render
    -E, --extension <ext>      specify the output file extension
    --name-after-file          Name the template after the last section of the file path (requires --client and overriden by --name)
    --doctype <str>            Specify the doctype on the command line (useful if it is not specified by the template)

  Examples:

    # translate jade the templates dir
    $ jade templates

    # create {foo,bar}.html
    $ jade {foo,bar}.jade

    # jade over stdio
    $ jade < my.jade > my.html

    # jade over stdio
    $ echo 'h1 Jade!' | jade

    # foo, bar dirs rendering to /tmp
    $ jade foo bar --out /tmp

$ jademod -M phpjade < input.jade > output.php

```

Please see the [phpjade](https://github.com/kurohara/phpjade) for detailed information about phpjade modifier.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2015 Hiroyoshi Kurohara
Licensed under the MIT license.
