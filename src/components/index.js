import "../../src/pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, clickLike } from "./card.js";
import { openModal, closeModal } from "./modal.js";

// DOM Elements for Adding New Card
const formAddCard = document.querySelector(".popup__form[name='new-place']");
const inputCardName = formAddCard.querySelector(".popup__input_type_card-name");
const inputCardLink = formAddCard.querySelector(".popup__input_type_url");

// DOM Elements for Profile Editing
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupCloseButtons = document.querySelectorAll(".popup__close");
const editProfilePopup = document.querySelector(".popup_type_edit");

// DOM Elements for Content and Cards
const content = document.querySelector(".content");
const addButton = content.querySelector(".profile__add-button");
const containerCards = content.querySelector(".places__list");

// DOM Elements for Image Popup
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");

// Functions
function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
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

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
});

addButton.addEventListener("click", () =>
  openModal(document.querySelector(".popup_type_new-card"))
);

editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editProfilePopup);
});

formElement.addEventListener("submit", (evt) => {
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
    closeModal(document.querySelector(".popup_type_new-card"));
  }
});
