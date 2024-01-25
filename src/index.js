// Импортироание функций
import processFoldersRecursively from './utils/processFoldersRecursively.mjs';
import clearAndCopyIndexFiles from './utils/clearAndCopyIndexFiles.mjs';

// Импортироание констант
import { buildDirectory, workDirectory } from './utils/constants.mjs';

// Запускаем процесс обработки папок
processFoldersRecursively(workDirectory);
clearAndCopyIndexFiles(workDirectory, buildDirectory);
