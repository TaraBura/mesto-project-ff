// Темплейт карточки
export const cardTemplate = document.querySelector("#card-template").content;
export const containerCards = document.querySelector(".places__list");

// Модальные окна
export const popupTypeImage = document.querySelector(".popup_type_image");
export const popupImageCloseButton = popupTypeImage.querySelector(".popup__close");
export const popupImage = popupTypeImage.querySelector(".popup__image");
export const popupCaption = popupTypeImage.querySelector(".popup__caption");

export const newCardPopup = document.querySelector(".popup_type_new-card");
export const newCardPopupCloseButton = newCardPopup.querySelector(".popup__close");
export const editAddButton = document.querySelector(".profile__add-button");

//Popup удаления карточки
export const popupDeleteQuestion = document.querySelector(".popup_type_question");
export const closeButtonQuestion = popupDeleteQuestion.querySelector(".popup__close");

//Профиль пользователя
export const profilePopup = document.querySelector(".popup_type_edit");
export const profilePopupCloseButton = profilePopup.querySelector(".popup__close");
export const editProfileButton = document.querySelector(".profile__edit-button");
export const profilePopupAvatar = document.querySelector(".popup_type_new-avatar");
export const popupAvatarCloseButton = profilePopupAvatar.querySelector(".popup__close");
export const profileImage = document.querySelector(".profile__image");
export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__description");

// Формы
export const formEditProfile = document.forms["edit-profile"];
export const formNewCard = document.forms["new-place"];
export const formNewAvatar = document.forms["avatar-edit"];

// Выбираем элементы, куда должны быть вставлены значения полей
export const nameInput = formEditProfile.elements.name;
export const jobInput = formEditProfile.elements.description;

// Находим поля формы в DOM
export const nameNewCard = formNewCard.elements["place-name"];
export const imageNewCard = document.getElementById("new-place-url-input");
export const imageAvatarNew = document.getElementById("avatar-url-input");

// Кнопки при загрузке страницы
export const profileSubmitButton = profilePopup.querySelector(".popup__button");
export const popupAvatarSubmitButton = profilePopupAvatar.querySelector(".popup__button");
export const submitButtonNewCard = formNewCard.querySelector(".popup__button");
export const submitDeleteButton = popupDeleteQuestion.querySelector(".popup__button-question");