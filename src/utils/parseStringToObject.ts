function isValidJSON(jsonString: string) {
  try {
    JSON.parse(jsonString);
  } catch (e) {
    return false;
  }
  return true;
}

export function parseStringToObject(str: string) {
  const isValid = isValidJSON(str);
  if (!isValid) {
    str = str.replace(/(\w+):/g, '"$1":'); // оборачиваем ключи в двойные кавычки
    str = str.replace(/: '(.+?)'(?=,|\})/g, ': "$1"'); // заменяем одинарные кавычки значений на двойные
    //str = str.replace(/: (\w+)(?=,|\})/g, ': "$1"'); // оборачиваем значения без кавычек в двойные кавычки
  }
  let jsonObj;

  try {
    jsonObj = JSON.parse(str);
    return jsonObj;
  } catch (error) {
    console.error('Ошибка при преобразовании строки в объект JSON:', error);
  }
}
