// Импорт модулей Node.js
import fs from 'fs';
import path from 'path';

// Импортироание функций
import copyIndexFiles from './copyIndexFiles.mjs';
import clearDirectory from './clearDirectory.mjs';

// Импортироание констант
import { buildFileName } from './constants.mjs';

// Асинхронная функция для очистки и копирования файлов
const clearAndCopyIndexFiles = async (srcPath, buildPath) => {
  // Создаем папку build, если она не существует
  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath);
  } else {
    // Если папка существует, очищаем ее
    await clearDirectory(buildPath);
  }

  // Сборка пути для файла index.json в папке build
  const buildIndexPath = path.join(buildPath, buildFileName);

  // Создание пустого объекта данных и запись его в файл index.json
  const buildIndexData = [];
  await fs.promises.writeFile(buildIndexPath, JSON.stringify(buildIndexData, null, 2));
  console.log(`Created ${buildIndexPath}`);

  // Рекурсивное копирование файлов index.json из папки src в папку build
  await copyIndexFiles(srcPath, buildPath, buildIndexData);
};

// Экспорт функции для использования в других модулях
export default clearAndCopyIndexFiles;
