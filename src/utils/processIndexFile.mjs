// Импорт модулей Node.js
import fs from 'fs';
import path from 'path';

// Импортироание функций
import readJsonFile from './readJsonFile.mjs';
import updateJsonData from './updateJsonData.mjs';
import writeJsonFile from './writeJsonFile.mjs';
import createIndexFile from './createIndexFile.mjs';

// Импортироание констант
import { additionalInfoFileName } from './constants.mjs';

// Функция для проверки наличия файла index.json и обработки его содержимого
const processIndexFile = (folderPath) => {
  const indexPath = path.join(folderPath, additionalInfoFileName);

  // Проверяем наличие файла index.json
  if (fs.existsSync(indexPath)) {
    try {
      const jsonData = readJsonFile(indexPath);
      updateJsonData(jsonData, folderPath);
      writeJsonFile(indexPath, jsonData);
    } catch (error) {
      console.error(`Error processing ${indexPath}: ${error.message}`);
    }
  } else {
    createIndexFile(folderPath);
  }
};

export default processIndexFile;
