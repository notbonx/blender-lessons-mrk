import path from 'path';

export default function generateTitle(filename) {
  // Удаляем расширение файла
  let title = path.parse(filename).name;

  // Удаляем нумерацию в начале файла
  title = title.replace(/^\s*\d+\s*-?\s*\.*\s*/, '');

  return title;
}
