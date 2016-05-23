#!/usr/bin/env node
require('babel-core/register')({
  // even though we transpile this repo's source to ./lib we still need a Babel require hook to
  // transpile the `require()` of the users routes file.
  presets: ['es2015'],
});
require('./lib/cli.js').default();
