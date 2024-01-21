// Импорт модулей Node.js
import fs from 'fs';
import fse from 'fs-extra';

// Импорт констант и функций
import { buildDirectory, workDirectory } from './utils/constants.mjs';
import generateIndex from './utils/generateIndex.mjs';
import saveIndexToFile from './utils/saveIndexToFile.mjs';

// Удаляем существующую папку build
if (fs.existsSync(buildDirectory)) {
  fse.removeSync(buildDirectory);
}

// Создаем папку build
fs.mkdirSync(buildDirectory);

// Генерация индекса и сохранение в файл
const indexData = generateIndex(workDirectory, buildDirectory);
saveIndexToFile(indexData);
