export class Card {
    constructor(
        card,
        templateSelector,
        handleCardClick,
        myName,
        onDeleteClick,
        userId,
        handleLikeClick
    ) {
        this.card = card;
        this.templateSelector = templateSelector;
        this.handleCardClick = handleCardClick;
        this.myName = myName;
        this.onDeleteClick = onDeleteClick;
        this.userId = userId;
        this._handleLikeClick = handleLikeClick;
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

    isLiked() {
        /* Метод возвращает true, если лайк установлен, и false, если нет */
        const _likeButton = this._cardTemplate.querySelector('.element__like');
        if (_likeButton.classList.contains('element__like_active')) {
            return true
        }
        else {
            return false
        }
    }

    setLikeInfo(likes) {
        this._cardTemplate.querySelector('.element__like-amount').textContent = likes.length;
        // Меняем состояние кнопки лайка
        const _likeButton = this._cardTemplate.querySelector('.element__like');
        _likeButton.classList.toggle('element__like_active');
    }

    _addEventListeners() {
        this._cardTemplate.querySelector('.element__like')
            .addEventListener('click', () => this._handleLikeClick());
        this._cardTemplate.querySelector('.element__button-mask-group')
            .addEventListener('click', this.handleCardClick);
        //навешиваю на кнопку trash слушатель для определения объекта карточки, на корзину которой кликнули
        this._cardTemplate.querySelector('.element__trash')
            .addEventListener('click',
                () => this.onDeleteClick(this.card._id, this._cardTemplate));
    }
}