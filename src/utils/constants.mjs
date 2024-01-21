// Импорт модулей Node.js
import path from 'path';

// Корневая директория проекта
const projectRootDirectory = '.';

// Директории
const buildDirectory = path.join(projectRootDirectory, 'build');
const workDirectory = path.join(projectRootDirectory, 'src/data');

// Имена файлов
const buildFileName = 'index.json';
const additionalInfoFileName = 'index.json';

export { projectRootDirectory, buildDirectory, buildFileName, additionalInfoFileName, workDirectory };
