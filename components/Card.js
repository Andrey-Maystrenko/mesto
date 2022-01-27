export class Card {
    constructor(
        card,
        templateSelector,
        handleCardClick,
        apiGetUserInfo,
        apiPostNewCard,
        myName,
        apiDeleteCard,
        apiPutLike,
        apiDeleteLike,
        onDeleteClick
    ) {
        this.card = card;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.apiGetUserInfo = apiGetUserInfo;
        this.apiPostNewCard = apiPostNewCard;
        this.myName = myName;
        this.apiDeleteCard = apiDeleteCard;
        this.apiPutLike = apiPutLike;
        this.apiDeleteLike = apiDeleteLike;
        this.onDeleteClick = onDeleteClick
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
        //навешиваю на кнопку trash слушатель для определения объекта карточки, на корзину которой кликнули
        this._cardTemplate.querySelector('.element__trash')
            .addEventListener('click', () => this.onDeleteClick(this.card._id, this._cardTemplate));

        // //навешиваю на кнопку trash слушатель для обработки удаления созданной отдельной карточки
        // this._cardTemplate.querySelector('.element__trash').addEventListener('click', this.deleteElement);
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
        //определяю, есть ли мое имя в массиве лайков и, если да
        if (this.card.likes.some((like) => like.name === this.myName)) {
            //делаю лайк активным
            this._cardTemplate.querySelector('.element__like').classList.add('element__like_active');
        }
        this._addEventListeners();
    }

    renderExistedCard() {
        this._renderCard();
        //запрашиваю с сервера данные usera для получения его name для определения "своей карточки"
        this.apiGetUserInfo
            //вставляю информацию из полученного объекта в разметку
            .then((result) => {
                if (this.card.owner._id === result._id) {
                    //делаю карточку удаляемой (с иконкой trash и присущими ей функциями)
                    this.makeCardRemovable();
                }
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
        return this._cardTemplate;
    }

    renderNewCard() {
        this._renderCard();
        //соханяю добавленную картинку на сервере
        this.apiPostNewCard(
            JSON.stringify({
                name: this.card.name,
                link: this.card.link,
                likes: []
            })
        )
            .then(result => {
                this.card = result;
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });

        return this._cardTemplate;
    }

    // deleteElement = () => {

    //     //удаляю из разметки карточку
    //     // this._cardTemplate.remove();
    //     // //удаляю объект карточки с сервера
    //     // this.apiDeleteCard(this.card._id)
    // }

    // _deleteCard = () => {
    //     //создаю новый экз класса PopupWithForm для открывания попапа по нажатию иконки trash
    //     const popupDelete = new PopupWithForm('.popup_delete', (evt) => {
    //         //задаю обработчик submit'а
    //         evt.preventDefault();
    //         //удаляю из разметки карточку
    //         this._cardTemplate.remove();
    //         this.apiDeleteCard(this.card._id);
    //         popupDelete.close();
    //     });
    //     popupDelete.open();
    //     popupDelete.setEventListeners();
    // }

    _likeCard = () => {
        const _likeButton = this._cardTemplate.querySelector('.element__like');
        _likeButton.classList.toggle('element__like_active');
        //если лайк поставлен (лайк активный)
        if (_likeButton.classList.contains('element__like_active')) {
            //отправляю свое owner.name на сервер в массив likes
            this.apiPutLike(
                JSON.stringify({
                    likes: this.card.owner.name
                }), this.card._id
            )
                .then((result) => {
                    console.log('лайк отправлен на сервер, мое имя в массиве лайков', result);
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
            this.apiDeleteLike(
                JSON.stringify({
                    likes: this.card.owner.name
                }), this.card._id
            )
                .then(result => {
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