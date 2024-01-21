import * as fs from 'fs';
import { buildDirectory, workDirectory } from './utils/constants.mjs';

import generateIndex from './utils/generateIndex.mjs';
import saveIndexToFile from './utils/saveIndexToFile.mjs';

// Создание папки build, если её нет
if (!fs.existsSync(buildDirectory)) {
  fs.mkdirSync(buildDirectory);
}

// Создание папки build, если её нет
if (!fs.existsSync(buildDirectory)) {
  fs.mkdirSync(buildDirectory);
}

// Генерация индекса и сохранение в файл
const indexData = generateIndex(workDirectory);
saveIndexToFile(indexData);
