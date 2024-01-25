// Импорт модулей Node.js
import fs from 'fs';
import path from 'path';

// Функция clearDirectory рекурсивно очищает указанную директорию
const clearDirectory = async (dirPath) => {
  // Получаем список файлов и поддиректорий в указанной директории
  const files = fs.readdirSync(dirPath);

  // Проходим по каждому файлу или поддиректории
  for (const file of files) {
    // Формируем полный путь к текущему файлу или поддиректории
    const filePath = path.join(dirPath, file);

    // Проверяем, является ли текущий элемент файлом или директорией
    if (fs.statSync(filePath).isDirectory()) {
      // Если это директория, вызываем clearDirectory рекурсивно
      await clearDirectory(filePath);

      // Удаляем пустую директорию
      await fs.promises.rmdir(filePath);
    } else {
      // Если это файл, удаляем его
      await fs.promises.unlink(filePath);
    }
  }
};

// Экспортируем функцию clearDirectory для использования в других модулях
export default clearDirectory;
