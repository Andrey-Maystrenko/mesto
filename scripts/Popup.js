export class Popup {
    constructor(popupSelector) {
        this.popupSelector = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
        this._popup = document.querySelector(this.popupSelector)
    }
    open() {
        //добавяю в код ПОПАПА класс, отвечающий за отображение ПОПАПА
        this._popup.classList.add('popup_opened');
        // навешиваю слушатель события для закрытия попапа по esc
        document.addEventListener('keydown',
        this._handleEscClose);
    }
    close() {
        //удаляю клас, отвечающий за отображение ПОПАПА
        this._popup.classList.remove('popup_opened');
        // удаляю слушатель события для закрытия попапа по esc
        document.removeEventListener('keydown',
            this._handleEscClose);
    }
    _handleEscClose(evt) {
        //помещаю в переменную элемент открытого в настоящий момент ПОПАПА
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners() {
        //программирую закрытие ПОПАПА по клику (на крестик или на оверлей)
        this._popup.addEventListener('click', (evt) => {
            if ((evt.target.classList.contains('popup_opened')) ||
                (evt.target.classList.contains('popup__close-button'))) {
                this.close()
            }
        })
    }
}