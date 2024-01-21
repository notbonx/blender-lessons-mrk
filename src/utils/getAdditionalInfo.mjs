// Импорт модулей Node.js
import fs from 'fs';
import path from 'path';

// Импорт констант и функций
import { buildFileName } from './constants.mjs';

/**
 * Получение дополнительной информации из файла index.json в указанной директории.
 * @param {string} directory - Путь к директории.
 * @returns {Object|null} - Дополнительная информация из файла index.json или null, если файл не существует.
 */
export default function getAdditionalInfo(directory) {
  // Путь к файлу index.json в указанной директории
  const indexPath = path.join(directory, buildFileName);

  // Проверка наличия файла
  if (fs.existsSync(indexPath)) {
    // Считывание данных из файла
    const jsonData = fs.readFileSync(indexPath, 'utf-8');
    // Преобразование JSON данных в объект
    return JSON.parse(jsonData);
  }

  // Возвращаем null, если файл не существует
  return null;
}
