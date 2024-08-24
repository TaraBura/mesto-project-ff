// Функция создания карточки
export function createCard(cardData, deleteCard, clickLike, openImagePopup) {
  const cardElement = document
    .querySelector("#card-template")
    .content.querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => deleteCard(cardElement));

  // Обработчик события клика на изображение
  cardImage.addEventListener("click", () => openImagePopup(cardData));

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => clickLike(likeButton));

  return cardElement;
}

//  Функция удаления карточки
export function deleteCard(cardItem) {
  cardItem.remove();
}

// Функция постановки лайка на карточке
export function clickLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
