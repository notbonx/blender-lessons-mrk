// Импорт модулей Node.js
import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Импорт констант и функций
import generateTitleFromFilename from './generateTitleFromFilename.mjs';
import { additionalInfoFileName } from './constants.mjs';

// Генерирует массив объектов уроков на основе файлов в указанной директории
// В каждом объекте урока содержится уникальный идентификатор и заголовок
export default function generateLessons(workDirectory, buildDirectory) {
  // Получаем список элементов в указанной директории
  const items = fs.readdirSync(workDirectory);
  const lessons = [];

  // Итерируем по каждому элементу в директории
  items.forEach((item) => {
    // Формируем полный путь к текущему элементу
    const currentPath = path.join(workDirectory, item);
    // Проверяем, является ли текущий элемент файлом
    const isFile = fs.statSync(currentPath).isFile();
    const isDirectory = fs.statSync(currentPath).isDirectory();

    // Если текущий элемент - директория, то копируем ее содержимое в папку build
    if (isDirectory) {
      // Формируем пути для текущей папки и ее содержимого в папке build
      const currentPathImages = path.join(buildDirectory, item);

      // Копируем содержимое папки в build
      fse
        .copy(currentPath, currentPathImages)
        .then(() => console.log(`Папка ${currentPath} успешно скопирована`))
        .catch((err) => console.error(err));
    }

    // Если это файл и он не является файлом с дополнительной информацией
    if (isFile && item !== additionalInfoFileName) {
      // Генерируем уникальный идентификатор урока
      const lessonId = uuidv4();
      // Генерируем заголовок урока на основе имени файла
      const lessonTitle = generateTitleFromFilename(item);

      // Добавляем объект урока в массив
      lessons.push({
        id: lessonId,
        title: lessonTitle,
      });

      const currentPathLesson = path.join(buildDirectory, lessonId);
      // Копирование файла из текущего пути (currentPath) в новый путь (currentPathLesson)
      fse
        .copy(currentPath, currentPathLesson) // Используем fse.copy для копирования файла
        .then(() => console.log(`Файл ${currentPath} успешно скопирован`)) // Выводим сообщение об успешном копировании
        .catch((err) => console.error(err)); // Выводим сообщение об ошибке, если копирование не удалось
    }
  });

  // Возвращаем сгенерированный массив уроков
  return lessons;
}
