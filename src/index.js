// Импорты
import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { renderLoading } from "./components/utils.js";
import {
  getUserInfo,
  getInitialCards,
  displayCard,
  editProfile,
  editAvatar,
  removeMyCard,
} from "./components/api.js";
import {
  cardTemplate,
  containerCards,
  popupTypeImage,
  popupImageCloseButton,
  popupImage,
  popupCaption,
  newCardPopup,
  newCardPopupCloseButton,
  editAddButton,
  popupDeleteQuestion,
  closeButtonQuestion,
  profilePopup,
  profilePopupCloseButton,
  editProfileButton,
  profilePopupAvatar,
  popupAvatarCloseButton,
  profileImage,
  profileName,
  profileJob,
  formEditProfile,
  formNewCard,
  formNewAvatar,
  nameInput,
  jobInput,
  nameNewCard,
  imageNewCard,
  imageAvatarNew,
  profileSubmitButton,
  popupAvatarSubmitButton,
  submitButtonNewCard,
  submitDeleteButton,
} from "./components/constants.js";

// Глобальные переменные
// Переменная для хранения идентификатора пользователя
let userId;

// Переменные для хранения текущих cardId и cardElement
let currentCardId = null;
let currentCardElement = null;

// Конфигурация валидатора форм
const configValidation = {
  formList: ".popup__form",
  inputList: ".popup__input",
  buttonElement: ".popup__button",
  buttonElementDisabled: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Объявление функций
// Функция загрузки данных пользователя и начальных карточек
function getData() {
  Promise.all([getUserInfo(), getInitialCards()])
    .then(([profileUser, initialCards]) => {
      userId = profileUser._id; // Сохраняем userId для дальнейшего использования

      // Обновляем информацию профиля пользователя
      profileImage.style.backgroundImage = `url(${profileUser.avatar})`;
      profileName.textContent = profileUser.name;
      profileJob.textContent = profileUser.about;

      // Создаём и добавляем карточки на страницу
      const fragment = document.createDocumentFragment(); // Для оптимизации
      initialCards.forEach((cardData) => {
        const cardElement = createCard(
          cardData,
          cardTemplate,
          openImagePopup,
          userId,
          openSubmitDeletePopup
        );
        fragment.appendChild(cardElement);
      });
      containerCards.appendChild(fragment);
    })
    .catch((error) => console.error("Ошибка при загрузке данных:", error));
}

// Обработчик отправки формы редактирования профиля
function handleFormEdit(evt) {
  evt.preventDefault();
  const newName = nameInput.value.trim();
  const newJob = jobInput.value.trim();

  renderLoading(true, profileSubmitButton); // Отображаем индикатор загрузки

  editProfile(newName, newJob)
    .then((res) => {
      profileName.textContent = res.name; // Обновляем имя пользователя
      profileJob.textContent = res.about; // Обновляем описание пользователя
      closeModal(profilePopup); // Закрываем модальное окно
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
    })
    .finally(() => {
      renderLoading(false, profileSubmitButton); // Скрываем индикатор загрузки
    });
}

// Обработчик отправки формы добавления новой карточки
function handleImageForm(evt) {
  evt.preventDefault();
  const name = nameNewCard.value.trim();
  const link = imageNewCard.value.trim();

  renderLoading(true, submitButtonNewCard); // Отображаем индикатор загрузки

  displayCard(name, link)
    .then((card) => {
      const cardElement = createCard(
        card,
        cardTemplate,
        openImagePopup,
        userId,
        openSubmitDeletePopup
      );
      containerCards.prepend(cardElement); // Добавляем карточку в начало списка
      formNewCard.reset(); // Сбрасываем форму
      clearValidation(newCardPopup, configValidation); // Очищаем валидацию
      closeModal(newCardPopup); // Закрываем модальное окно
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки:", error);
    })
    .finally(() => {
      renderLoading(false, submitButtonNewCard); // Скрываем индикатор загрузки
    });
}

// Обработчик отправки формы обновления аватара
function handleImageAvatar(evt) {
  evt.preventDefault();
  const newAvatar = imageAvatarNew.value.trim();

  renderLoading(true, popupAvatarSubmitButton); // Отображаем индикатор загрузки

  editAvatar(newAvatar)
    .then((res) => {
      // Устанавливаем новое изображение аватара
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      formNewAvatar.reset(); // Сбрасываем форму
      clearValidation(formNewAvatar, configValidation); // Очищаем валидацию
      closeModal(profilePopupAvatar); // Закрываем модальное окно
    })
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
    })
    .finally(() => {
      renderLoading(false, popupAvatarSubmitButton); // Скрываем индикатор загрузки
    });
}

// Открытие изображения карточки на весь экран
function openImagePopup(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(popupTypeImage);
}

// Функция открытия модального окна для удаления карточки
function openSubmitDeletePopup(cardId, cardElement) {
  currentCardId = cardId; // Сохраняем текущий ID карточки
  currentCardElement = cardElement; // Сохраняем текущий элемент карточки
  openModal(popupDeleteQuestion);
}

// Обработчик события удаления карточки
function handleRemoveMyCard(evt) {
  evt.preventDefault();

  if (!currentCardId || !currentCardElement) {
    console.error("Нет информации о карточке для удаления.");
    return;
  }

  renderLoading(true, submitDeleteButton, "Удаление...", "Да"); // Параметры текста загрузки и исходного текста кнопки

  removeMyCard(currentCardId)
    .then(() => {
      currentCardElement.remove(); // Удаляем карточку из DOM
      closeSubmitDeletePopup(); // Закрываем модальное окно
    })
    .catch((error) => {
      console.error("Ошибка при удалении карточки:", error);
    })
    .finally(() => {
      renderLoading(false, submitDeleteButton, "Удаление...", "Да"); // Возвращаем исходный текст кнопки
      currentCardId = null; // Сбрасываем текущие данные
      currentCardElement = null;
    });
}

// Функция закрытия модального окна удаления карточки
function closeSubmitDeletePopup() {
  closeModal(popupDeleteQuestion);
  currentCardId = null; // Сбрасываем текущие данные
  currentCardElement = null;
}

// Навешивание слушателей событий
// Открытие модального окна редактирования профиля и подстановка текущих данных
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(profilePopup, configValidation);
  openModal(profilePopup);
});

// Подключение обработчика события отправки формы редактирования профиля
formEditProfile.addEventListener("submit", handleFormEdit);

// Обработчик закрытия модального окна редактирования профиля
profilePopupCloseButton.addEventListener("click", () => {
  formEditProfile.reset(); // Сбрасываем форму
  closeModal(profilePopup); // Закрываем модальное окно
});

// Обработчик открытия модального окна добавления новой карточки
editAddButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

// Подключение обработчика события отправки формы добавления новой карточки
formNewCard.addEventListener("submit", handleImageForm);

// Обработчик закрытия модального окна добавления новой карточки
newCardPopupCloseButton.addEventListener("click", () => {
  formNewCard.reset(); // Сбрасываем форму
  clearValidation(newCardPopup, configValidation); // Очищаем валидацию
  closeModal(newCardPopup); // Закрываем модальное окно
});

// Обработчик открытия модального окна обновления аватара
profileImage.addEventListener("click", () => {
  openModal(profilePopupAvatar);
});

// Подключение обработчика события отправки формы обновления аватара
formNewAvatar.addEventListener("submit", handleImageAvatar);

// Обработчик закрытия модального окна обновления аватара
popupAvatarCloseButton.addEventListener("click", () => {
  closeModal(profilePopupAvatar); // Закрываем модальное окно
  clearValidation(formNewAvatar, configValidation); // Очищаем валидацию
  formNewAvatar.reset(); // Сбрасываем форму
});

// Обработчик закрытия модального окна изображения
popupImageCloseButton.addEventListener("click", () => {
  closeModal(popupTypeImage);
});

// Обработчик события удаления карточки
submitDeleteButton.addEventListener("click", handleRemoveMyCard);

// Обработчик закрытия модального окна подтверждения удаления карточки
closeButtonQuestion.addEventListener("click", () => {
  closeSubmitDeletePopup();
});

// Вызов функций
// Инициализируем валидацию форм
enableValidation(configValidation);

// Загружаем данные пользователя и начальные карточки
getData();
