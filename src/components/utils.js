// Функция смены текста кнопки, при загрузке данных
export function renderLoading(isLoading, button) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
}
