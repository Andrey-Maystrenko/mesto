import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.imagePopup = document.querySelector(`${popupSelector} .popup__mask-group-full-size`);
        this.imagePopupTitle = document.querySelector(`${popupSelector} .popup__title-mask-group`);
    }
    handleCardClick = (event) => {
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
        super.open()
    }
}