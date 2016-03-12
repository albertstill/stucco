/* eslint-disable no-console */
import fs from 'fs-extra';
import path from 'path';

export default function scaffold() {
  try {
    const p = path.join(process.cwd(), '.stuccorc');
    console.log(p);
    fs.statSync(p);
    console.log('There is already a .stuccorc. Aborting...');
  } catch (e) {
    console.log('Scaffolding application...');
    fs.copy(path.join(__dirname, '../scaffold'), process.cwd());
    const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));
    pkg.scripts.watch = 'stucco watch';
    fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(pkg, {}, 2));
    console.log('Finished. Run `npm run watch` to get started');
  }
}
