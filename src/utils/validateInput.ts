export const validateInput = (value: string | number, type: string) => {
  console.log(value);
  console.log(type);
  const typeVal = typeof value;
  if (typeVal !== type) {
    return false;
  }
  if (typeVal) {
    return value;
  }
};
