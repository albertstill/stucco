/* eslint-disable no-console */
import 'babel-core/register';
import commander from 'commander';
import { version } from '../package.json';
import server from './server.js';
import scaffold from './scaffold.js';

export default function cli() {
  commander.version(version);

  commander.command(
    'watch'
  ).action(() => {
    server();
  });

  commander.command(
    'scaffold'
  ).action(() => {
    scaffold();
  });

  commander.parse(process.argv);

  if (!process.argv.slice(2).length) {
    commander.outputHelp();
  }
}

