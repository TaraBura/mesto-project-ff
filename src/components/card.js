import { likeCard, removeLikeCard, removeMyCard } from "./api";

// Функция создания карточки
export function createCard(
  cardData,
  cardTemplate,
  openImagePopup,
  userId,
  openSubmitDeletePopup
) {
  const cardElement = cardTemplate.querySelector(".card");

  if (!cardElement) {
    console.error("Элемент с классом .card не найден в шаблоне.");
    return null;
  }

  // Клонирование шаблона карточки
  const newCard = cardElement.cloneNode(true);

  // Получение необходимых элементов из карточки
  const deleteButton = newCard.querySelector(".card__delete-button");
  const likeButton = newCard.querySelector(".card__like-button");
  const cardImage = newCard.querySelector(".card__image");
  const cardTitle = newCard.querySelector(".card__title");
  const likeCounter = newCard.querySelector(".like__counter");

  // Установка изображения и заголовка
  if (cardImage) {
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardImage.addEventListener("click", openImagePopup);
  } else {
    console.error("Элемент с классом .card__image не найден в карточке.");
  }

  if (cardTitle) {
    cardTitle.textContent = cardData.name;
  } else {
    console.error("Элемент с классом .card__title не найден в карточке.");
  }

  // Настройка счётчика лайков
  if (likeCounter) {
    likeCounter.textContent = cardData.likes.length;
  } else {
    console.error("Элемент с классом .like__counter не найден в карточке.");
  }

  // Настройка кнопки лайка
  if (likeButton) {
    likeButton.dataset.id = cardData._id;
    likeButton.addEventListener("click", likeIt);

    // Проверка, поставил ли текущий пользователь лайк
    const isMyLike = cardData.likes.some((like) => like._id === userId);
    if (isMyLike) {
      likeButton.classList.add("card__like-button_is-active");
    }
  } else {
    console.error("Элемент с классом .card__like-button не найден в карточке.");
  }

  // Настройка кнопки удаления
  if (deleteButton) {
    if (cardData.owner._id !== userId) {
      deleteButton.classList.add("card__delete-button--hidden");
    }
    if (cardData.owner._id === userId) {
      deleteButton.addEventListener("click", () =>
        openSubmitDeletePopup(
          cardData._id,
          () => deleteCard(cardData._id),
          newCard
        )
      );
    }
  } else {
    console.error(
      "Элемент с классом .card__delete-button не найден в карточке."
    );
  }

  return newCard;
}

// Функция удаления карточки
function deleteCard(id) {
  return removeMyCard(id);
}

// Функция постановки или удаления лайка на карточке
function likeIt(evt) {
  const likeButton = evt.target;
  const id = likeButton.dataset.id;
  const likeCounter = likeButton.nextElementSibling;

  if (!likeCounter) {
    console.error("Элемент счётчика лайков не найден рядом с кнопкой лайка.");
    return;
  }

  if (likeButton.classList.contains("card__like-button_is-active")) {
    removeLikeCard(id)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      })
      .catch((error) => console.error("Ошибка при удалении лайка:", error));
  } else {
    likeCard(id)
      .then((data) => {
        likeCounter.textContent = data.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((error) => console.error("Ошибка при добавлении лайка:", error));
  }
}
