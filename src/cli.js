/* eslint-disable no-console */
import commander from 'commander';
import { version } from '../package.json';
import { server } from './index.js';

export default function cli() {
  commander.version(version);

  commander.command(
    'watch'
  ).action(() => {
    console.log('Watching');
    server.default();
  });

  commander.parse(process.argv);
}
