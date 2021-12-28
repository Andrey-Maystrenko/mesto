import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this.submitForm = submitForm;
    }
    _getInputValues() {
        const inputs = Array.from(
            document.querySelector(this.popupSelector)
                .querySelectorAll('.form__input')
        );
        const values = inputs.map((element) => {
            return element.value;
        });
        return values;
    }
    setEventListeners() {
        super.setEventListeners();
        document.querySelector(this.popupSelector)
            .querySelector('.form')
            .addEventListener('submit', this.submitForm);
    }
    close() {
        super.close();
        const inputs = document.querySelectorAll('.form__input');
        inputs.forEach(element => {
            element.value = '';
        });
    }
}