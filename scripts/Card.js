import { PopupWithForm } from "./PopupWithForm";

export class Card {
    constructor(card, templateSelector, handleCardClick) {
        this.card = card;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
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
        //вставляю количество лайков в разметку
        // this._cardTemplate.querySelector('.element__like-amount').textContent = this.card.likes.length
        this._addEventListeners();
        return this._cardTemplate;
    }

    _deleteCard = () => {
        const popupDelete = new PopupWithForm('.popup_delete', (evt) => {
            evt.preventDefault();
            this._cardTemplate.remove();
            popupDelete.close();
        });
        // const deleteButton = document.querySelector('.popup_delete').
        //     querySelector('.popup__save-button');

        // deleteButton.classList.remove('.popup__save-button_disabled');
        // deleteButton.disabled = false;

        // console.log(deleteButton);
        popupDelete.open();
        popupDelete.setEventListeners();
    }
    _likeCard = () => {
        const _likeButton = this._cardTemplate.querySelector('.element__like');
        _likeButton.classList.toggle('element__like_active');

    }

    _addEventListeners() {
        // this._cardTemplate.querySelector('.element__trash').addEventListener('click', this._deleteCard);
        this._cardTemplate.querySelector('.element__like').addEventListener('click', this._likeCard);
        this._cardTemplate.querySelector('.element__button-mask-group').addEventListener('click', this.handleCardClick);
    }
}


