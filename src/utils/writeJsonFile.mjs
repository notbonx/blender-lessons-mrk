// Импорт модулей Node.js
import fs from 'fs';

const writeJsonFile = (filePath, jsonData) => {
  // Записываем JSON-данные в файл с отступами и кодировкой UTF-8
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));

  // Выводим сообщение о успешном обновлении файла с информацией о содержимом
  console.log(
    `Updated ${filePath} with id: ${jsonData.id}, module: ${jsonData.title}, lessons: ${jsonData.lessons.length} lessons added, sorted, and removed unused lessons`,
  );
};

// Экспортируем функцию для использования в других модулях
export default writeJsonFile;
