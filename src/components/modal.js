// Функция открытия попапа
export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  setTimeout(() => {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", closePopupByEsc);
    popup.addEventListener("click", closePopupByOverlay);
  }, 10);
}

//  Функция закрытия попапа
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePopupByEsc);
  popup.removeEventListener("click", closePopupByOverlay);
  setTimeout(() => {
    popup.classList.remove("popup_is-animated");
  }, 600);
}

//  Функция закрытия попапа по оверлею
function closePopupByOverlay(event) {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
}
//  Функция закрытия попапа по Esc
function closePopupByEsc(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}