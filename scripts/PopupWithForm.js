import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this.submitForm = submitForm;
        this._inputs = this._popup.querySelectorAll('.form__input');
    }
    _getInputValues() {
        const inputs = Array.from(this._inputs);
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
        this._inputs.forEach(element => {
            element.value = '';
        });
    }
}