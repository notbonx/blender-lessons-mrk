import * as fs from 'fs';
import path from 'path';
import { buildFile, buildDirectory } from './constants.mjs';

export default function saveIndexToFile(data) {
  const indexPath = path.join(buildDirectory, buildFile);
  fs.writeFileSync(indexPath, JSON.stringify(data, null, 2));
  console.log(`Файл ${buildFile} создан успешно!`);
}
