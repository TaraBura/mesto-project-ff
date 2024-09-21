// Импорт стилей
import "./pages/index.css";
import "./vendor/fonts.css";
import "./vendor/normalize.css";

// Импорт функций и констант из модулей
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
  submitDeleteButton,
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
  imageAvatarNew
} from "./components/constants.js";

let userId; // Переменная для хранения идентификатора пользователя

// Загружаем данные пользователя и начальные карточки
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
getData();

// Открытие модального окна редактирования профиля и подстановка текущих данных
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(profilePopup, configValidation);
  openModal(profilePopup);
});

// Обработчик отправки формы редактирования профиля
function handleFormEdit(evt) {
  evt.preventDefault();
  const newName = nameInput.value.trim();
  const newJob = jobInput.value.trim();

  // Дополнительная валидация перед отправкой (опционально)
  if (!newName || !newJob) {
    alert("Поля имени и должности не могут быть пустыми.");
    return;
  }

  const submitButton = profilePopup.querySelector(".popup__button");
  renderLoading(true, submitButton); // Отображаем индикатор загрузки

  editProfile(newName, newJob)
    .then((res) => {
      profileName.textContent = res.name;    // Обновляем имя пользователя
      profileJob.textContent = res.about;    // Обновляем описание пользователя
      closeModal(profilePopup);              // Закрываем модальное окно
    })
    .catch((error) => {
      console.error("Ошибка при обновлении профиля:", error);
      alert("Не удалось обновить профиль. Пожалуйста, попробуйте позже.");
    })
    .finally(() => {
      renderLoading(false, submitButton);    // Скрываем индикатор загрузки
    });
}

// Подключение обработчика события отправки формы редактирования профиля
formEditProfile.addEventListener("submit", handleFormEdit);

// Обработчик закрытия модального окна редактирования профиля
profilePopupCloseButton.addEventListener("click", () => {
  formEditProfile.reset();                   // Сбрасываем форму
  closeModal(profilePopup);                  // Закрываем модальное окно
});

// Обработчик отправки формы добавления новой карточки
function handleImageForm(evt) {
  evt.preventDefault();
  const name = nameNewCard.value.trim();
  const link = imageNewCard.value.trim();

  // Дополнительная валидация (опционально)
  if (!name || !link) {
    alert("Поля названия и ссылки не могут быть пустыми.");
    return;
  }

  const submitButton = formNewCard.querySelector(".popup__button");
  renderLoading(true, submitButton); // Отображаем индикатор загрузки

  displayCard(name, link)
    .then((card) => {
      const cardElement = createCard(
        card,
        cardTemplate,
        openImagePopup,
        userId,
        openSubmitDeletePopup
      );
      containerCards.prepend(cardElement);      // Добавляем карточку в начало списка
      formNewCard.reset();                       // Сбрасываем форму
      clearValidation(newCardPopup, configValidation); // Очищаем валидацию
      closeModal(newCardPopup);                  // Закрываем модальное окно
    })
    .catch((error) => {
      console.error("Ошибка при добавлении карточки:", error);
      alert("Не удалось добавить карточку. Пожалуйста, попробуйте позже.");
    })
    .finally(() => {
      renderLoading(false, submitButton);        // Скрываем индикатор загрузки
    });
}

// Подключение обработчика события отправки формы добавления новой карточки
formNewCard.addEventListener("submit", handleImageForm);

// Обработчик открытия модального окна добавления новой карточки
editAddButton.addEventListener("click", () => {
  openModal(newCardPopup);
});

// Обработчик закрытия модального окна добавления новой карточки
newCardPopupCloseButton.addEventListener("click", () => {
  formNewCard.reset();                         // Сбрасываем форму
  clearValidation(newCardPopup, configValidation); // Очищаем валидацию
  closeModal(newCardPopup);                    // Закрываем модальное окно
});

// Обработчик отправки формы обновления аватара
function handleImageAvatar(evt) {
  evt.preventDefault();
  const newAvatar = imageAvatarNew.value.trim();

  // Дополнительная валидация (опционально)
  if (!newAvatar) {
    alert("Поле ссылки на аватар не может быть пустым.");
    return;
  }

  const submitButton = profilePopupAvatar.querySelector(".popup__button");
  renderLoading(true, submitButton);           // Отображаем индикатор загрузки

  editAvatar(newAvatar)
    .then((res) => {
      // Устанавливаем новое изображение аватара
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      formNewAvatar.reset();                     // Сбрасываем форму
      clearValidation(formNewAvatar, configValidation); // Очищаем валидацию
      closeModal(profilePopupAvatar);           // Закрываем модальное окно
    })
    .catch((error) => {
      console.error("Ошибка при обновлении аватара:", error);
      alert("Не удалось обновить аватар. Пожалуйста, попробуйте позже.");
    })
    .finally(() => {
      renderLoading(false, submitButton);        // Скрываем индикатор загрузки
    });
}

// Подключение обработчика события отправки формы обновления аватара
formNewAvatar.addEventListener("submit", handleImageAvatar);

// Обработчик открытия модального окна обновления аватара
profileImage.addEventListener("click", () => {
  openModal(profilePopupAvatar);
});

// Обработчик закрытия модального окна обновления аватара
popupAvatarCloseButton.addEventListener("click", () => {
  closeModal(profilePopupAvatar);                // Закрываем модальное окно
  clearValidation(formNewAvatar, configValidation); // Очищаем валидацию
  formNewAvatar.reset();                         // Сбрасываем форму
});

// Открытие изображения карточки на весь экран
function openImagePopup(evt) {
  if (evt.target.classList.contains('card__image')) { // Проверяем, что клик был по изображению карточки
    const cardImage = evt.target;
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardImage.alt;
    openModal(popupTypeImage);
  }
}

// Обработчик закрытия модального окна изображения
popupImageCloseButton.addEventListener("click", () => {
  closeModal(popupTypeImage);
});

// Функция открытия модального окна для удаления карточки
function openSubmitDeletePopup(cardId, deleteCard, cardElement) {
  openModal(popupDeleteQuestion);
  
  // Добавляем обработчик события только один раз
  submitDeleteButton.addEventListener(
    "click",
    () => {
      deleteCard(cardId)
        .then(() => {
          closeSubmitDeletePopup();
          cardElement.remove();
        })
        .catch((error) => {
          console.log(error);
          alert("Не удалось удалить карточку. Пожалуйста, попробуйте позже.");
        });
    },
    { once: true }
  );
}

// Функция закрытия модального окна удаления карточки
function closeSubmitDeletePopup() {
  closeModal(popupDeleteQuestion);
}

// Обработчик закрытия модального окна подтверждения удаления карточки
closeButtonQuestion.addEventListener("click", () => {
  closeModal(popupDeleteQuestion);
});

// Конфигурация валидатора форм
const configValidation = {
  formList: ".popup__form",
  inputList: ".popup__input",
  buttonElement: ".popup__button",
  buttonElementDisabled: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Инициализируем валидацию форм
enableValidation(configValidation);