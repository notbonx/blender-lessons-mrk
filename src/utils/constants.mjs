// Импорт модулей Node.js
import path from 'path';

// Корневая директория проекта
const projectRootDirectory = '.';

// Директории
const buildDirectory = path.join(projectRootDirectory, 'build');
const workDirectory = path.join(projectRootDirectory, 'src/data');
const assetsDirectory = 'images';

// Имена файлов
const buildFileName = 'index.json';
const additionalInfoFileName = 'index.json';

export { assetsDirectory, projectRootDirectory, buildDirectory, buildFileName, additionalInfoFileName, workDirectory };
