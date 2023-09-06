export function convertDateToISO(dateInput?: Date | string) {
  if (!dateInput) {
    const date = new Date();

    return date.toISOString();
  }
  const date = new Date(dateInput);

  // Возврат строки в формате ISO 8601
  return date.toISOString();
}
