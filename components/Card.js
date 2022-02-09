export class Card {
    constructor(
        card,
        templateSelector,
        handleCardClick,
        myName,
        apiPutLike,
        apiDeleteLike,
        onDeleteClick,
        userId
    ) {
        this.card = card;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.myName = myName;
        this.apiPutLike = apiPutLike;
        this.apiDeleteLike = apiDeleteLike;
        this.onDeleteClick = onDeleteClick;
        this.userId = userId
    }

    _createCardDomNode() {
        this._cardTemplate = document
            .querySelector(this.templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    _makeCardRemovable() {
        //вставляю в разметку добавленной карточки кнопку trash для удаления карточки
        this._cardTemplate.querySelector('.element__trash').classList.remove('element__trash_visible');

        // //навешиваю на кнопку trash слушатель для определения объекта карточки, на корзину которой кликнули
        // this._cardTemplate.querySelector('.element__trash')
        //     .addEventListener('click',
        //         () => this.onDeleteClick(this.card._id, this._cardTemplate));
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
        //определяю, есть ли мое имя в массиве лайков и, если да
        if (this.card.likes.some((like) => like.name === this.myName)) {
            //делаю лайк активным
            this._cardTemplate.querySelector('.element__like').classList.add('element__like_active');
        }
        //определяю, моя ли это карточка
        if (this.card.owner._id === this.userId) {
            //делаю карточку удаляемой (с иконкой trash и присущими ей функциями)
            this._makeCardRemovable();
        }
        this._addEventListeners();
        return this._cardTemplate;
    }

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
        this._cardTemplate.querySelector('.element__like')
            .addEventListener('click', this._likeCard);
        this._cardTemplate.querySelector('.element__button-mask-group')
            .addEventListener('click', this.handleCardClick);
        //навешиваю на кнопку trash слушатель для определения объекта карточки, на корзину которой кликнули
        this._cardTemplate.querySelector('.element__trash')
            .addEventListener('click',
                () => this.onDeleteClick(this.card._id, this._cardTemplate));
    }
}