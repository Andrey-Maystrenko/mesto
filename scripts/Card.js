import { openPopup } from './utils.js';

export class Card {
    constructor(imagePopup, imagePopupTitle, card, templateSelector) {
        this.imagePopup = imagePopup;
        this.imagePopupTitle = imagePopupTitle;
        this.card = card;
        this.templateSelector = templateSelector;
        // помещаю в переменную ПОПАП для КАРТИНКИ full size
        this.popupImage = document.querySelector('.popup_mask-group');
    }
    _createCardDomNode() {
        this._cardTemplate = document
            .querySelector(this.templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    renderCard() {
        this._createCardDomNode();
        //получаю html код рисунка карточки и задаю ему атрибут scr со значением link из массива
        this._cardTemplate.querySelector('.element__mask-group').setAttribute("src", this.card.link);
        this._cardTemplate.querySelector('.element__mask-group').setAttribute("alt", this.card.name);
        //получаю html код названия карточки и задаю ему название name из массива
        this._cardTemplate.querySelector('.element__name').textContent = this.card.name;
        this._addEventListeners();
        return this._cardTemplate;

    }

    _deleteCard = () => {
        this._cardTemplate.remove();
    }

    _likeCard = () => {
        const _likeButton = this._cardTemplate.querySelector('.element__like');
        _likeButton.classList.toggle('element__like_active');
    }

    _openMaskGroupPopup = (event) => {
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
        openPopup(this.popupImage)
    }

    _addEventListeners() {
        this._cardTemplate.querySelector('.element__trash').addEventListener('click', this._deleteCard);
        this._cardTemplate.querySelector('.element__like').addEventListener('click', this._likeCard);
        this._cardTemplate.querySelector('.element__button-mask-group').addEventListener('click', this._openMaskGroupPopup);
    }
}