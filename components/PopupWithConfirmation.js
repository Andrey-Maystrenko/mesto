import { Popup } from './Popup.js';
export class PopupWithConfirmation extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this.submitForm = submitForm;
    }
    setEventListeners() {
        super.setEventListeners();
        document.querySelector(this.popupSelector)
            .querySelector('.form')
            .addEventListener('submit', (evt) => {
                evt.preventDefault();
                this.submitForm();
            }
            )
    }
}