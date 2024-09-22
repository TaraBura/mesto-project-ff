// Функция смены текста кнопки при загрузке данных
export function renderLoading(
  isLoading,
  button,
  loadingText = "Сохранение...",
  originalText = "Сохранить"
) {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = originalText;
  }
}
