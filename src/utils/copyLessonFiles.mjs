// Импорт модулей Node.js
import fs from 'fs';
import path from 'path';

// Функция асинхронного копирования файлов уроков из исходной папки в папку сборки
const copyLessonFiles = async (srcPath, buildPath, lessons, srcItems) => {
  // Итерируем по каждому уроку
  for (const lesson of lessons) {
    // Находим соответствующий файл урока в исходной папке
    const item = srcItems.find((item) => item.replace(/^(\d+)\s*\.?-?\s*(.+)\.(md)$/, '$2') === lesson.title);

    // Формируем полные пути к файлам урока в исходной и папке сборки
    const lessonFilePath = path.join(srcPath, item);
    const buildLessonFilePath = path.join(buildPath, lesson.id);

    // Асинхронно копируем файл урока
    await fs.promises.copyFile(lessonFilePath, buildLessonFilePath);

    // Выводим информацию о копировании в консоль
    console.log(`Copied ${lessonFilePath} to ${buildLessonFilePath}`);
  }
};

// Экспорт функции копирования файлов уроков
export default copyLessonFiles;
