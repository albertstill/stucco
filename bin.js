#!/usr/bin/env node
require('babel-core/register')({
  presets: ['es2015', 'react'],
});
require('./lib/cli.js').default();
