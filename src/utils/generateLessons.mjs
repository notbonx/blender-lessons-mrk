import * as fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import generateTitle from './generateTitle.mjs';
import { additionalInfoFile } from './constants.mjs';

export default function generateLessons(directory) {
  const items = fs.readdirSync(directory);
  const lessons = [];

  items.forEach((item) => {
    const currentPath = path.join(directory, item);
    const isFile = fs.statSync(currentPath).isFile();

    if (isFile && item !== additionalInfoFile) {
      const lessonId = uuidv4();
      const lessonTitle = generateTitle(item);

      lessons.push({
        id: lessonId,
        title: lessonTitle,
      });
    }
  });

  return lessons;
}
