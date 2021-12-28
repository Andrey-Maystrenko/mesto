import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(imagePopup, imagePopupTitle, popupSelector) {
        super(popupSelector);
        this.imagePopup = imagePopup;
        this.imagePopupTitle = imagePopupTitle;
    }

    open() {
        //добавяю в код ПОПАПА класс, отвечающий за отображение ПОПАПА
        document.querySelector(this.popupSelector).classList.add('popup_opened');
        super.setEventListeners();
    }

    _handleCardClick = (event) => {
        //определяю на какой элемент кликнули
        const maskGroupTarget = event.target;
        //извелкаю из кода кликнутого элемента путь к КАРТИНКЕ (src)
        const maskGroupTargetImage = maskGroupTarget.getAttribute('src');
        //вставляю путь КАРТИНКИ  в ПОПАП КАРТИНКИ
        this.imagePopup.setAttribute("src", maskGroupTargetImage);
        //извлекаю название КАРТИНКИ
        const elementName = event.currentTarget.parentElement.querySelector('.element__name').textContent;
        //вставляю название КАРТИНКИ в ПОПАП КАРТИНКИ
        this.imagePopupTitle.textContent = elementName;
        //вставляю атрибут alt в тэг КАРТИНКИ
        this.imagePopup.setAttribute("alt", elementName);
        //вставляю метод для открытия ПОПАПА КАРТИНКИ
        this.open()
    }
}