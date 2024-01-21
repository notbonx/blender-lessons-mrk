// Импорт модулей Node.js
import fs from 'fs';
import path from 'path';

// Импорт констант и функций
import { buildFileName, buildDirectory } from './constants.mjs';

/**
 * Сохраняет индексный файл в указанную директорию.
 *
 * @param {Object} data - Данные для сохранения в индексный файл
 */
export default function saveIndexToFile(data) {
  // Путь к индексному файлу в директории build
  const indexPath = path.join(buildDirectory, buildFileName);

  // Записываем данные в индексный файл с форматированием (2 пробела для отступов)
  fs.writeFileSync(indexPath, JSON.stringify(data, null, 2));

  // Выводим сообщение об успешном создании файла в консоль
  console.log(`Файл ${buildFileName} создан успешно!`);
}
