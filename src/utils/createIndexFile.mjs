// Импорт модулей Node.js
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Импортироание функций
import writeJsonFile from './writeJsonFile.mjs';

// Импортироание констант
import { additionalInfoFileName } from './constants.mjs';

// Функция createIndexFile создает файл index.json для указанной папки
const createIndexFile = (folderPath) => {
  // Создаем новый объект данных для index.json
  const newJsonData = {
    id: uuidv4(),
    lessons: [],
  };

  // Извлекаем название папки и убираем числовой префикс, если он есть
  const folderName = path.basename(folderPath);
  newJsonData.title = folderName.replace(/^(\d+)\s*\.?-?\s*(.+)\.(md)$/, '$2');

  // Получаем список файлов уроков в папке
  const lessonFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith('.md'));

  // Заполняем массив lessons данными из файлов уроков
  newJsonData.lessons = lessonFiles.map((file) => {
    // Генерируем уникальный идентификатор для урока
    const lessonId = uuidv4();
    // Извлекаем название урока из имени файла, убирая числовой префикс
    const lessonTitle = file.replace(/^(\d+)\s*\.?-?\s*(.+)\.(md)$/, '$2');

    // Возвращаем объект с данными урока
    return {
      title: lessonTitle,
      id: lessonId,
    };
  });

  // Формируем путь для файла index.json внутри папки
  const indexPath = path.join(folderPath, additionalInfoFileName);

  // Записываем данные в файл index.json
  writeJsonFile(indexPath, newJsonData);
};

// Экспортируем функцию createIndexFile для использования в других модулях
export default createIndexFile;
