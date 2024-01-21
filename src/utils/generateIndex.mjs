// Импорт модулей Node.js
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Импорт констант и функций
import generateTitleFromFilename from './generateTitleFromFilename.mjs';
import generateLessons from './generateLessons.mjs';
import getAdditionalInfo from './getAdditionalInfo.mjs';

/**
 * Генерирует индекс для указанной директории.
 * @param {string} directory - Путь к директории.
 * @returns {Array} - Массив, содержащий информацию о модулях.
 */
export default function generateIndex(workDirectory, buildDirectory) {
  // Получаем содержимое директории
  const items = fs.readdirSync(workDirectory);
  const indexData = [];

  // Итерируем по каждому элементу в директории
  items.forEach((item) => {
    const currentPath = path.join(workDirectory, item);
    const isDirectory = fs.statSync(currentPath).isDirectory();

    // Если элемент является директорией
    if (isDirectory) {
      // Генерируем уникальный идентификатор для модуля
      const moduleId = uuidv4();

      // Создаем новую директорию в папке build с использованием идентификатора модуля
      fs.mkdirSync(path.join(buildDirectory, moduleId));

      // Генерируем человекочитаемый заголовок для модуля
      const moduleTitle = generateTitleFromFilename(item);

      // Генерируем информацию о занятиях в модуле
      const lessons = generateLessons(currentPath, path.join(buildDirectory, moduleId));

      // Получаем дополнительную информацию о модуле
      const additionalInfo = getAdditionalInfo(currentPath);

      // Добавляем информацию о модуле в массив indexData
      indexData.push({
        id: moduleId,
        title: moduleTitle,
        lessons: lessons,
        ...additionalInfo,
      });
    }
  });

  return indexData;
}
