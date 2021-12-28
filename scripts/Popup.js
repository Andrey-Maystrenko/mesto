export class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this)
    }
    open() {
        //добавяю в код ПОПАПА класс, отвечающий за отображение ПОПАПА
        document.querySelector(this.popupSelector).classList.add('popup_opened');
        this.setEventListeners();
    }
    close() {
        //удаляю клас, отвечающий за отображение ПОПАПА
        document.querySelector(this.popupSelector).classList.remove('popup_opened');
        // this.removeEventListeners();

    }
    _handleEscClose(evt) {
        //помещаю в переменную элемент открытого в настоящий момент ПОПАПА
        if (evt.key === 'Escape') {
            this.close();
        }

    }
    setEventListeners() {
        //навешиваю событие закрытия ПОПАПА по нажатию esc
        document.addEventListener('keydown',
            this._handleEscClose);

        //программирую закрытие ПОПАПА по клику (на крестик или на оверлей)
        document.querySelector(this.popupSelector).addEventListener('click', (evt) => {
            if ((evt.target.classList.contains('popup_opened')) ||
                (evt.target.classList.contains('popup__close-button'))) {
                this.close()
            }
        })
    }
}