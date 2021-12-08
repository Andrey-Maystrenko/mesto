const hideInputError = (formElement, inputElement, config) => {
    const { inputErrorClass, errorClass, } = config;
    // Находим блок, в котором отображается ошибка.
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    //удаляем стили поля и текста при ошибке
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    // Удаляем текст ошибки из блока.
    errorElement.textContent = '';
}

const showInputError = (formElement, inputElement, errorMessage, { errorClass, inputErrorClass }) => {
    // Находим блок, в котором отображается ошибка.
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    // Записываем текст ошибки в блок отображения ошибки.
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
    //проверяем содержание поля инпут на валидность методом validity.valid
    if (inputElement.validity.valid) {
        hideInputError(formElement, inputElement, config);
    } else {
        showInputError(formElement, inputElement, inputElement.validationMessage, config);
    }
}
//задаем состояние кнопки попапа в зависимости от проверки валидности формы
const toggleButtonState = (formElement, buttonElement, inactiveButtonClass) => {
    // Проверяем валидность формы.
    const isFormValid = formElement.checkValidity();
    // Если форма невалидна, то присваиваем свойству disabled кнопки значение true
    buttonElement.disabled = !isFormValid;
    // Если форма невалидна, добавляем кнопке класс
    buttonElement.classList.toggle(inactiveButtonClass, !isFormValid)
}

const setEventListeners = (formElement, config) => {
    /*
        Разбиваем конфиг на составляющие, чтобы передать нужные свойства в функции.
    */
    const {
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        errorClass,
        inputErrorClass
    } = config
    // inputSelector позволяет найти все поля ввода
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    // С помощью submitButtonSelector находим кнопку отправки формы.
    const buttonElement = formElement.querySelector(submitButtonSelector);
    /*
        inactiveButtonClass навашивается на кнопку формы, если она неактивна.
        Эту функцию вызываем здесь, чтобы сделать кнопку неактивной при открытии страницы.
        Иначе кнопка будет активной до первого ввода в поля формы.
    */
    toggleButtonState(formElement, buttonElement, inactiveButtonClass);
    // Навешиваем слушатель на ввод в поля формы попапа.
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, { errorClass, inputErrorClass });
            toggleButtonState(formElement, buttonElement, inactiveButtonClass);
        });
    });
};

const enableValidation = (config) => {
    /*
        Пример использования rest-оператора.
        Из объекта config извлекаем свойство formSelector, остальные свойства помещаем в объект props. Название объекта
        может быть любым.

    */
    const { formSelector, ...props } = config;
    const inputList = Array.from(document.querySelectorAll(formSelector));
    inputList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        // объект props передаём дальше. Он будет содержать в себе все необходимые свойства
        setEventListeners(formElement, props);
    })
};

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'form__input_error',
    errorClass: 'popup__error_visible',
});
