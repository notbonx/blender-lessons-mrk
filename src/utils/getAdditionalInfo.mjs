import * as fs from 'fs';
import path from 'path';
import { buildFile } from './constants.mjs';

export default function getAdditionalInfo(directory) {
  const indexPath = path.join(directory, buildFile);

  if (fs.existsSync(indexPath)) {
    const jsonData = fs.readFileSync(indexPath, 'utf-8');
    return JSON.parse(jsonData);
  }

  return null;
}
