import { PopupWithForm } from "./PopupWithForm.js";
import { Api } from "./Api.js";
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
    headers: {
        authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
        'Content-Type': 'application/json'
    }
})
export class Card {
    constructor(card, templateSelector, handleCardClick, myName) {
        this.card = card;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.myName = myName;
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

    _renderCard() {
        this._createCardDomNode();
        //получаю html код рисунка карточки и задаю ему атрибут scr со значением link из массива
        this._cardTemplate.querySelector('.element__mask-group').setAttribute("src", this.card.link);
        this._cardTemplate.querySelector('.element__mask-group').setAttribute("alt", this.card.name);
        //получаю html код названия карточки и задаю ему название name из массива
        this._cardTemplate.querySelector('.element__name').textContent = this.card.name;
        //вставляю количество лайков в разметку
        this._cardTemplate.querySelector('.element__like-amount').textContent = this.card.likes.length;
        // console.log(`object`, this.card.likes.some((like) => like.name === this.myName))
        if (this.card.likes.some((like) => like.name === this.myName)) {

            this._cardTemplate.querySelector('.element__like').classList.add('element__like_active');
        }
        this._addEventListeners();
    }

    renderExistedCard() {
        this._renderCard();
        //запрашиваю с сервера данные usera для получения его name для определения "своей карточки"
        // api.getUserInfo()
        //     //вставляю информацию из полученного объекта в разметку
        //     .then((result) => {
        //         if (this.card.owner.name === result.name) {
        //             //деалю карточку удаляемой (с иконкой trash и присущими ей функциями)
        //             this.makeCardRemovable();
        //         }
        //         console.log(`массив`, this.card.likes)
        //         console.log(`искомый элемент массива`, { name: result.name, about: result.about, avatar: result.avatar })
        //         if (this.card.likes.some({ name: result.name, about: result.about, avatar: result.avatar })) {
        //             document.querySelector('.element__like').classList.add('.element__like_active')
        //         }
        //     }
        //     )
        //     .catch((err) => {
        //         console.log(err); // выведем ошибку в консоль
        //     });
        // console.log(this.card)
        return this._cardTemplate;
    }

    renderNewCard() {
        this._renderCard();
        console.log(`объект после создания карточки`, this.card)
        //соханяю добавленную картинку на сервере
        api.postNewCard(
            JSON.stringify({
                name: this.card.name,
                link: this.card.link,
                likes: [],
            })
        )
            .then(result => {
                this.card = result;
                console.log(`возврат объект после POST`, this.card)
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
        return this._cardTemplate;
    }

    _deleteCard = () => {
        //создаю новый экз класса PopupWithForm для открывания попапа по нажатию иконки trash
        const popupDelete = new PopupWithForm('.popup_delete', (evt) => {
            //задаю обработчик submit'а
            evt.preventDefault();
            //удаляю из разметки карточку
            this._cardTemplate.remove();
            api.deleteCard(this.card._id);
            popupDelete.close();
        });
        popupDelete.open();
        popupDelete.setEventListeners();
    }

    _likeCard = () => {
        const _likeButton = this._cardTemplate.querySelector('.element__like');
        _likeButton.classList.toggle('element__like_active');
        //если лайк поставлен (лайк активный)
        if (_likeButton.classList.contains('element__like_active')) {
            //отправляю свое owner.name на сервер в массив likes
            api.putLike(
                JSON.stringify({
                    likes: this.card.owner.name
                }), this.card._id
            )
                .then((result) => {
                    console.log(`объект this.card после добавления лайка`, result);
                    //вставляю новое количество лайков в разметку
                    this._cardTemplate.querySelector('.element__like-amount').textContent = result.likes.length;
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                });
        }
        //если лайк снят
        else {
            //удаляю свое owner.name из массива likes
            api.deleteLike(
                JSON.stringify({
                    likes: this.card.owner.name
                }), this.card._id
            )
                .then(result => {
                    console.log(`объект this.card после снятия лайка`, result);
                    //вставляю новое количество лайков в разметку
                    this._cardTemplate.querySelector('.element__like-amount').textContent = result.likes.length;
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                });
        }
    }

    _addEventListeners() {
        this._cardTemplate.querySelector('.element__like').addEventListener('click', this._likeCard);
        this._cardTemplate.querySelector('.element__button-mask-group').addEventListener('click', this.handleCardClick);
    }
}


