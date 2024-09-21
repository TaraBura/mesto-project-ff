// Функция открытия попапа
export function openModal(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePopupByEsc);
  popupElement.addEventListener("click", closePopupByOverlay);
}

//  Функция закрытия попапа
export function closeModal(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
  popupElement.removeEventListener("click", closePopupByOverlay);
}

//  Функция закрытия попапа по оверлею
function closePopupByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  }
}
//  Функция закрытия попапа по Esc
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}
