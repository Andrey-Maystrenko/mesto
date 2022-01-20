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
    makeCardRemovable() {
        //вставляю в разметку добавленной карточки кнопку trash для удаления карточки
        this._cardTemplate.insertAdjacentHTML('beforeend', '<button class="element__trash" type="button"></button>');
        //навешиваю на кнопку trash слушатель для обработки удаления созданной отдельной карточки
        this._cardTemplate.querySelector('.element__trash').addEventListener('click', this._deleteCard);
    }
    renderCard() {
        this._createCardDomNode();
        //получаю html код рисунка карточки и задаю ему атрибут scr со значением link из массива
        this._cardTemplate.querySelector('.element__mask-group').setAttribute("src", this.card.link);
        this._cardTemplate.querySelector('.element__mask-group').setAttribute("alt", this.card.name);
        //получаю html код названия карточки и задаю ему название name из массива
        this._cardTemplate.querySelector('.element__name').textContent = this.card.name;
        //вставляю количество лайков в разметку
        this._cardTemplate.querySelector('.element__like-amount').textContent = this.card.likes.length;
        this._addEventListeners();
        fetch('https://nomoreparties.co/v1/cohort-34/users/me', {
            headers: {
                authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8'
            }
        })
            .then(res => res.json())
            //вставляю информацию из полученного объекта в разметку
            .then((result) => {
                if (this.card.owner.name === result.name) {
                    this.makeCardRemovable();
                }
                console.log(`массив`, this.card.likes)
                console.log(`искомый элемент массива`, { name: result.name, about: result.about, avatar: result.avatar })
                if (this.card.likes.some({ name: result.name, about: result.about, avatar: result.avatar })) {
                    document.querySelector('.element__like').classList.add('.element__like_active')
                }

            }
            )

        console.log(this.card)
        return this._cardTemplate;
    }
    renderNewCard() {
        // this.renderCard()
        this._createCardDomNode();
        //получаю html код рисунка карточки и задаю ему атрибут scr со значением link из массива
        this._cardTemplate.querySelector('.element__mask-group').setAttribute("src", this.card.link);
        this._cardTemplate.querySelector('.element__mask-group').setAttribute("alt", this.card.name);
        //получаю html код названия карточки и задаю ему название name из массива
        this._cardTemplate.querySelector('.element__name').textContent = this.card.name;
        //вставляю количество лайков в разметку
        this._cardTemplate.querySelector('.element__like-amount').textContent = this.card.likes.length;
        this._addEventListeners();
        console.log(`объект после создания карточки`, this.card)

        //соханяю добавленную картинку на сервере
        fetch('https://mesto.nomoreparties.co/v1/cohort-34/cards', {
            method: 'POST',
            headers: {
                authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.card.name,
                link: this.card.link,
                likes: [],
            })
        })
            .then(res => res.json())
            .then(result => {
                this.card = result;
                console.log(`возврат объект после POST`, this.card)
            });

        return this._cardTemplate;
    }
    _deleteCard = () => {
        const popupDelete = new PopupWithForm('.popup_delete', (evt) => {
            evt.preventDefault();
            this._cardTemplate.remove();
            fetch(`https://mesto.nomoreparties.co/v1/cohort-34/cards/${this.card._id}`, {
                method: 'DELETE',
                headers: {
                    authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
                }
            })
            popupDelete.close();
        });
        popupDelete.open();
        popupDelete.setEventListeners();
    }
    _likeCard = () => {
        const _likeButton = this._cardTemplate.querySelector('.element__like');
        _likeButton.classList.toggle('element__like_active');
        if (_likeButton.classList.contains('element__like_active')) {
            fetch(`https://mesto.nomoreparties.co/v1/cohort-34/cards/${this.card._id}/likes `, {
                method: 'PUT',
                headers: {
                    authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    likes: this.card.owner.name
                })
            })
                .then(res => res.json())
                .then(result => {
                    console.log(`объект this.card после добавления лайка`, result);
                    //вставляю новое количество лайков в разметку
                    this._cardTemplate.querySelector('.element__like-amount').textContent = result.likes.length;
                })
        }
        else {
            fetch(`https://mesto.nomoreparties.co/v1/cohort-34/cards/${this.card._id}/likes `, {
                method: 'DELETE',
                headers: {
                    authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    likes: this.card.owner.name
                })
            })
                .then(res => res.json())
                .then(result => {
                    console.log(`объект this.card после снятия лайка`, result);
                    //вставляю новое количество лайков в разметку
                    this._cardTemplate.querySelector('.element__like-amount').textContent = result.likes.length;
                })
        }
    }
    _addEventListeners() {
        // this._cardTemplate.querySelector('.element__trash').addEventListener('click', this._deleteCard);
        this._cardTemplate.querySelector('.element__like').addEventListener('click', this._likeCard);
        this._cardTemplate.querySelector('.element__button-mask-group').addEventListener('click', this.handleCardClick);
    }
}


