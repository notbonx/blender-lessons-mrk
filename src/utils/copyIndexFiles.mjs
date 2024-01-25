// Импорт модулей Node.js
import fs from 'fs';
import path from 'path';

// Импортироание функций
import copyLessonFiles from './copyLessonFiles.mjs';

// Импортироание констант
import { additionalInfoFileName, buildFileName, assetsDirectory } from './constants.mjs';

// Рекурсивное копирование файлов index.json из папки src в папку build.
const copyIndexFiles = async (srcPath, buildPath, buildIndexData) => {
  // Получаем список файлов в исходной папке
  const files = fs.readdirSync(srcPath);
  const srcItems = fs.readdirSync(srcPath);

  for (const file of files) {
    const filePath = path.join(srcPath, file);

    // Проверяем, является ли текущий файл директорией (папкой) и не является ли папкой assetsDirectory
    if (fs.statSync(filePath).isDirectory() && file !== assetsDirectory) {
      // Рекурсивно вызываем copyIndexFiles для вложенной папки
      await copyIndexFiles(filePath, buildPath, buildIndexData);
    } else if (file === additionalInfoFileName) {
      // Если текущий файл - файл с дополнительной информацией (additionalInfoFileName)
      const srcIndexContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const buildIndexPath = path.join(buildPath, buildFileName);

      // Добавляем содержимое файла index.json в массив в файле build/index.json
      buildIndexData.push(srcIndexContent);

      // Записываем обновленные данные обратно в файл
      await fs.promises.writeFile(buildIndexPath, JSON.stringify(buildIndexData, null, 2));
      console.log(`Copied ${filePath} to ${buildIndexPath}`);

      const buildId = srcIndexContent.id;
      const buildModulePath = path.join(buildPath, buildId);

      // Если папка с именем id из файла index.json в папке build не существует, создаем ее
      if (!fs.existsSync(buildModulePath)) {
        await fs.promises.mkdir(buildModulePath);
      }

      // Рекурсивно вызываем copyLessonFiles для копирования уроков
      await copyLessonFiles(srcPath, buildModulePath, srcIndexContent.lessons, srcItems);
    }
  }
};

export default copyIndexFiles;
