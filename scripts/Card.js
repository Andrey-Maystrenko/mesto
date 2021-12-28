import { PopupWithImage } from './PopupWithImage.js';

const popupWithImage = new PopupWithImage(
    document.querySelector('.popup__mask-group-full-size'),
    document.querySelector('.popup__title-mask-group'),
    '.popup_mask-group')

export class Card {
    constructor(card, templateSelector) {
        this.card = card;
        this.templateSelector = templateSelector;
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

    _addEventListeners() {
        this._cardTemplate.querySelector('.element__trash').addEventListener('click', this._deleteCard);
        this._cardTemplate.querySelector('.element__like').addEventListener('click', this._likeCard);
        this._cardTemplate.querySelector('.element__button-mask-group').addEventListener('click', popupWithImage._handleCardClick);
    }
}