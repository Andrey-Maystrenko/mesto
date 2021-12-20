export class FormValidator {

    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
    }

    _hideInputError = (inputField) => {
        // Находим <input>, в котором отображается ошибка, и соответствующий элемент <span>.
        const errorName = inputField.getAttribute('name');
        const errorElement = this.formElement.querySelector(`#${errorName}`);
        //удаляем стили поля и текста при ошибке
        inputField.classList.remove(this.config.inputErrorClass);
        errorElement.classList.remove(this.config.errorClass);
        // Удаляем текст ошибки из блока.
        errorElement.textContent = '';
    }

    _showInputError = (inputField) => {
        // Находим <input>, в котором отображается ошибка, и соответствующий элемент <span>.
        const errorName = inputField.getAttribute('name');
        const errorElement = this.formElement.querySelector(`#${errorName}`);
        inputField.classList.add(this.config.inputErrorClass);
        // Записываем текст ошибки в блок отображения ошибки.
        errorElement.textContent = inputField.validationMessage;
        errorElement.classList.add(this.config.errorClass);
    };

    _checkInputValidity = (inputField) => {
        //проверяем содержание поля инпут на валидность методом validity.valid
        if (inputField.validity.valid) {
            this._hideInputError(inputField);
        } else {
            this._showInputError(inputField);
        }
    }

    //задаем состояние кнопки попапа в зависимости от проверки валидности формы
    _toggleButtonState = () => {
        // Проверяем валидность формы.
        const isFormValid = this.formElement.checkValidity();
        // Если форма невалидна, то присваиваем свойству disabled кнопки значение true
        const saveButtonElement = this.formElement.querySelector(this.config.submitButtonSelector);
        saveButtonElement.disabled = !isFormValid;
        // Если форма невалидна, добавляем кнопке класс
        saveButtonElement.classList.toggle(this.config.inactiveButtonClass, !isFormValid);
    }

    _setEventListeners = () => {
        const inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        this._toggleButtonState();
        // Навешиваем слушатели на ввод в поля формы попапа.
        inputList.forEach((item) => {
            // const inputField = item;
            item.addEventListener('input', () => {
                this._checkInputValidity(item);
                this._toggleButtonState();
            });
        });
    }

    enableValidation = () => {
        this.formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    }
}