import "../../src/pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, clickLike } from "./card.js";
import { openModal, closeModal } from "./modal.js";

// DOM Elements for Adding New Card
const formAddCard = document.querySelector(".popup__form[name='new-place']");
const inputCardName = formAddCard.querySelector(".popup__input_type_card-name");
const inputCardLink = formAddCard.querySelector(".popup__input_type_url");

// DOM Elements for Profile Editing
const formEditProfile = document.querySelector(".popup__form[name='edit-profile']");
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

// DOM Elements for Content and Cards
const content = document.querySelector(".content");
const addButton = content.querySelector(".profile__add-button");
const containerCards = content.querySelector(".places__list");
const profileName = content.querySelector(".profile__title");
const profileJob = content.querySelector(".profile__description");
const editProfileButton = content.querySelector(".profile__edit-button");

// DOM Elements for Image Popup
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupCaption = popupTypeImage.querySelector(".popup__caption");

const addCardPopup = document.querySelector(".popup_type_new-card");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const editProfilePopup = document.querySelector(".popup_type_edit");

// Functions
function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupTypeImage);
}

// Initialization
initialCards.forEach((card) => {
  containerCards.append(
    createCard(card, deleteCard, clickLike, openImagePopup)
  );
});

// Event Listeners
popupCloseButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const popup = this.closest(".popup");
    closeModal(popup);
  });
});

addButton.addEventListener("click", () =>
  openModal(addCardPopup)
);

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editProfilePopup);
});

formEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(editProfilePopup);
});

formAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const cardName = inputCardName.value;
  const cardLink = inputCardLink.value;

  if (cardName && cardLink) {
    const newCard = createCard(
      { name: cardName, link: cardLink },
      deleteCard,
      clickLike,
      openImagePopup
    );
    containerCards.prepend(newCard);
    formAddCard.reset();
    closeModal(addCardPopup);
  }
});
