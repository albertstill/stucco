import path from 'path';
import fs from 'fs-extra';

const log = console.log.bind(console);

function copyScaffoldedFiles() {
  fs.copy(
    path.join(__dirname, '../scaffold'),
    process.cwd(),
    { clobber: false }
  );
}

function updatePackageJson() {
  const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'package.json')));
  pkg.scripts.watch = 'stucco watch';
  pkg.scripts.dist = 'stucco dist';
  fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(pkg, {}, 2));
}

export default function scaffold() {
  log('Scaffolding application...');
  log('This will NOT merge or overwrite existing files.');
  log('Please see https://github.com/subshad/stucco for changes required to your existing stucco files.');
  copyScaffoldedFiles();
  updatePackageJson();
  log('Finished. Run `npm run watch` to get started');
}
