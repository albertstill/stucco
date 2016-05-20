import fs from 'fs';
import path from 'path';

export function getStuccorcJSON() {
  try {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), '.stuccorc')));
  } catch (e) {
    if (e.code === 'ENOENT') {
      throw new Error('No .stuccorc found. Please run `stucco scaffold`.');
    } else {
      throw e;
    }
  }
}
