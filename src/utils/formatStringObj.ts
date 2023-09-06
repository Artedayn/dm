export function formatStringObj(obj: { [key: string]: string | number }) {
  const string = JSON.stringify(obj).split(',').join(',\n');
  const arrFromString = string.split('');
  arrFromString.splice(1, 0, '\n');
  arrFromString.splice(-1, 0, '\n');
  const newString = arrFromString.join('');

  return newString;
}
