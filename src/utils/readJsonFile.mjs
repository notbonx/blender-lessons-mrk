// Импорт модулей Node.js
import fs from 'fs';

// Функция для чтения JSON-файла
const readJsonFile = (filePath) => {
  // Читаем содержимое файла с использованием кодировки utf-8
  const content = fs.readFileSync(filePath, 'utf-8');

  // Преобразуем содержимое файла из JSON-строки в объект JavaScript
  return JSON.parse(content);
};

// Экспортируем функцию для дальнейшего использования
export default readJsonFile;
