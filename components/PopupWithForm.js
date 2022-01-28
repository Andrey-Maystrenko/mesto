import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this.submitForm = submitForm;
        this._inputs = this._popup.querySelectorAll('.form__input');
    }
    _getInputValues() {
        // console.log('разметка полей ввода', this._inputs);
        // const array = this._inputs;
        // const values = {}
        // this._inputs.forEach(element => {
        //     const values = {
        //         array.indexOf(element): element.value,
        //     };
        // })
        const values = {
            field1: this._inputs[0].value,
            field2: this._inputs[1].value
        }

        return values;
    }
    setEventListeners() {
        super.setEventListeners();
        document.querySelector(this.popupSelector)
            .querySelector('.form')
            .addEventListener('submit', (evt) => {
                if (this.popupSelector === '.popup_delete') {
                    console.log('отработал if');
                    // Эта строчка отменяет стандартную отправку формы.
                    evt.preventDefault();
                    this.submitForm();
                } else {
                    //Эта строчка отменяет стандартную отправку формы
                    evt.preventDefault();
                    this.submitForm(this._getInputValues());
                }

            })
    }
    close() {
        super.close();
        this._inputs.forEach(element => {
            element.value = '';
        });
    }
}