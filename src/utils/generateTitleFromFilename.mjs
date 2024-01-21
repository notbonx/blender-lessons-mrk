// Импорт модулей Node.js
import path from 'path';

/**
 * Генерация заголовка из имени файла.
 * @param {string} filename - Имя файла.
 * @returns {string} - Сгенерированный заголовок.
 */
export default function generateTitleFromFilename(filename) {
  // Удаляем расширение файла
  let title = path.parse(filename).name;

  // Удаляем нумерацию в начале файла
  title = title.replace(/^\s*\d+\s*-?\s*\.*\s*/, '');

  return title;
}
