// Токен: dd1dbf2c-5beb-4ecd-b2da-38506ca41c18
// Идентификатор группы: wff-cohort-22

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-22",
  headers: {
    authorization: "dd1dbf2c-5beb-4ecd-b2da-38506ca41c18",
    "Content-Type": "application/json",
  },
};

//Проверяем получение данных
function resCheck(res) {
  if (res.ok) return res.json();
  return Promise.reject(`Ошибка: ${res.status}`);
}

//Загрузка информации о пользователе
export function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => resCheck(res));
}

//Загрузка карточек с сервера
export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => resCheck(res));
}

//Отображение карточки на странице
export function displayCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => resCheck(res));
}

//Редактировать данные профиля
export function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => resCheck(res));
}

//Обновить аватар
export function editAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => resCheck(res));
}

//Лайк карточки
export function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => resCheck(res));
}

//Убрать лайк карточки
export function removeLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => resCheck(res));
}

//Удалить свою карточку
export function removeMyCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => resCheck(res));
}
