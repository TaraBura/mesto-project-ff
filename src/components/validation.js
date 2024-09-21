export const enableValidation = (configValidation) => {
  const forms = Array.from(
    document.querySelectorAll(configValidation.formList)
  );
  forms.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, configValidation);
  });
};

// Очистка ошибок валидации
export function clearValidation(formElement, configValidation) {
  const inputList = Array.from(
    formElement.querySelectorAll(configValidation.inputList)
  );
  const buttonElement = formElement.querySelector(configValidation.buttonElement);
  // Очистка ошибок валидации для каждого поля
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, configValidation);
  });
  // Деактивация кнопки
  toggleButtonState(inputList, buttonElement, configValidation);
}

// Функция добавления класса с ошибкой
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  configValidation
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(configValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(configValidation.errorClass);
};

// Функция удаления класса с ошибкой
const hideInputError = (formElement, inputElement, configValidation) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(configValidation.inputErrorClass);
  errorElement.classList.remove(configValidation.errorClass);
  errorElement.textContent = "";
  inputElement.setCustomValidity("");
};

// Функция, которая проверяет валидность поля
const checkInputValidity = (formElement, inputElement, configValidation) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      configValidation
    );
  } else {
    hideInputError(formElement, inputElement, configValidation);
  }
};

const setEventListeners = (formElement, configValidation) => {
  const inputList = Array.from(
    formElement.querySelectorAll(configValidation.inputList)
  );
  const buttonElement = formElement.querySelector(
    configValidation.buttonElement
  );
  //проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, configValidation);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, configValidation);
      toggleButtonState(inputList, buttonElement, configValidation);
    });
  });
};

//Проверяем был ли ввод верным или неверным
const hasInvalidInput = (inputList) => {
  // проходим по массиву
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей и элемент кнопки
const toggleButtonState = (
  inputList,
  buttonElement,
  configValidation
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(configValidation.buttonElementDisabled);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(
      configValidation.buttonElementDisabled
    );
  }
};
