import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this.submitForm = submitForm;
        this._inputs = this._popup.querySelectorAll('.form__input');
    }
    _getInputValues() {
        const inputs = Array.from(this._inputs);
        //преобразую массив c разметками полей ввода с введенными значениями
        //в объект с полями fild1, field 2 (if any)
        const values = inputs.reduce((acc, current, index) => {
            acc[`field${index + 1}`] = current.value;
            return acc;
        }, {});
        return values;
    }
    setEventListeners() {
        super.setEventListeners();
        document.querySelector(this.popupSelector)
            .querySelector('.form')
            .addEventListener('submit', (evt) => {
                //Эта строчка отменяет стандартную отправку формы
                evt.preventDefault();
                this.submitForm(this._getInputValues());
            })
    }

    close() {
        super.close();
        document.querySelector(this.popupSelector)
            .querySelector('.form').reset();
        // this._inputs.forEach(element => {
        //     element.value = '';
        // });
    }
}