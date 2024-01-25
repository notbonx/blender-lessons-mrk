// Импорт модулей Node.js
import fs from 'fs';
import path from 'path';

// Импортироание функций
import processIndexFile from './processIndexFile.mjs';

// Импортироание констант
import { assetsDirectory } from './constants.mjs';

// Рекурсивно обходим все папки внутри корневой папки
const processFoldersRecursively = (folderPath) => {
  // Получаем список элементов в текущей папке
  const files = fs.readdirSync(folderPath);

  // Обрабатываем каждый элемент
  files.forEach((file) => {
    const filePath = path.join(folderPath, file);

    // Проверяем, является ли элемент папкой
    if (fs.statSync(filePath).isDirectory() && file !== assetsDirectory) {
      // Рекурсивно обходим подпапки
      processFoldersRecursively(filePath);

      // Обрабатываем содержимое папки
      processIndexFile(filePath);
    }
  });
};

export default processFoldersRecursively;
