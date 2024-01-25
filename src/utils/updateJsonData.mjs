// Импорт модулей Node.js
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Функция для обновления данных в JSON файле на основе содержимого папки
const updateJsonData = (jsonData, folderPath) => {
  // Проверяем наличие свойства "id"
  jsonData.id = jsonData.id || uuidv4();

  // Извлекаем название папки и убираем числовой префикс, если он есть
  const folderName = path.basename(folderPath);
  jsonData.title = folderName.replace(/^(\d+)\s*\.?-?\s*(.+)$/, '$2');

  // Проверяем наличие свойства "lessons"
  jsonData.lessons = jsonData.lessons || [];

  // Обрабатываем каждый файл в папке
  const lessonFiles = fs.readdirSync(folderPath).filter((file) => file.endsWith('.md'));

  // Создаем Map для существующих уроков, используя название в качестве ключа
  const existingLessonsMap = new Map(jsonData.lessons.map((lesson) => [lesson.title, lesson]));

  // Обновляем массив уроков в JSON данных
  jsonData.lessons = lessonFiles.map((file) => {
    // Извлекаем название урока из имени файла
    const lessonTitle = file.replace(/^(\d+)\s*\.?-?\s*(.+)\.(md)$/, '$2');

    // Получаем существующий урок по названию из Map
    const existingLesson = existingLessonsMap.get(lessonTitle);

    // Возвращаем объект урока с обновленным или новым идентификатором
    return {
      title: lessonTitle,
      id: existingLesson ? existingLesson.id : uuidv4(),
    };
  });
};

// Экспортируем функцию для использования в других частях кода
export default updateJsonData;
