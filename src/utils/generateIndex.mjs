import * as fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import generateTitle from './generateTitle.mjs';
import generateLessons from './generateLessons.mjs';
import getAdditionalInfo from './getAdditionalInfo.mjs';

export default function generateIndex(directory) {
  const items = fs.readdirSync(directory);
  const indexData = [];

  items.forEach((item) => {
    const currentPath = path.join(directory, item);
    const isDirectory = fs.statSync(currentPath).isDirectory();

    if (isDirectory) {
      const moduleId = uuidv4();
      const moduleTitle = generateTitle(item);
      const lessons = generateLessons(currentPath);
      const additionalInfo = getAdditionalInfo(currentPath);

      indexData.push({
        id: moduleId,
        title: moduleTitle,
        lessons: lessons,
        ...additionalInfo,
      });
    }
  });

  return indexData;
}
