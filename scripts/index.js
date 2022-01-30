import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import '../pages/index.css';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Api } from '../components/Api.js';
import { renderLoading } from '../utils/utils.js';

const popupWithImage = new PopupWithImage('.popup_mask-group');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
    userNameSelector: '.info__name',
    userInfoSelector: '.info__engagement'
});

//создаю экземляр класса Апи для запросов к серверу методами этого класса
const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
    headers: {
        authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
        'Content-Type': 'application/json'
    }
})

//помещаю код кнопки "Редактировать" инфо в константу
const editButton = document.querySelector('.info__edit-button');

//помещаю код кнопки "Добваить" картинку/карточку в константу
const addButton = document.querySelector('.profile__add-button');

//помещаю код всей ФОРМЫ ввода для "Edit info" в константу
const formEditInfo = document.querySelector('.form_edit-info');

//помещаю код всей ФОРМЫ ввода для "Form element" в константу
const formAddElement = document.querySelector('.form_add-element');

//помещаю код всей ФОРМЫ для "Edit avatar" в константу
const formEditAvatar = document.querySelector('.form_edit-avatar');

const config = {
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'form__input_error',
    errorClass: 'popup__error_visible',
}

//помещаю в переменнную селектор template'a разметки карточки 
const templateSelector = ".template";

//помещаю в переменную разметку аватара
const avatar = document.querySelector('.avatar');

//задаю функцию создания экземпляра класса карточки вместе с обработчиком ее удаления
function createCardExample(data, result) {
    const newCard = new Card(
        data,
        templateSelector,
        popupWithImage.handleCardClick,
        api.getUserInfo(),
        api.postNewCard,
        result.name,
        api.putLike,
        api.deleteLike,
        onDeleteClick);
    //создаю обработчик нажатия на корзину удаления карточки
    function onDeleteClick(id, cardMarkup) {
        //создаю обработчик submit'a попапа удаления карточки
        const deleteCardPopupForm = new PopupWithForm('.popup_delete', () => {
            // удаляю объект карточки с сервера и разметку карточки из разметки страницы
            api.deleteCard(id)
                .then(() => {
                    cardMarkup.remove();
                    deleteCardPopupForm.close();
                })
                .catch((err) => {
                    console.log(err); // выведем ошибку в консоль
                })
        });
        //прикрепляю обработчик к форме удаления попапа
        deleteCardPopupForm.setEventListeners();
        //открываю попап удаления карточки
        deleteCardPopupForm.open();
    };
    return newCard;
}

//отрисовываю начальные данные о пользователе - свойства name, about, avatar
//запрашиваю с сервера информацию о пользователе - свойства name, about, avatar
api.getUserInfo()
    //вставляю информацию из полученного объекта в разметку
    .then((result) => {
        userInfo.setUserInfo(result.name, result.about);
        document.querySelector('.avatar__photo').setAttribute("src", result.avatar);
        // получаю с сервера массив с дданными начальных карточек для их рендеринга
        api.getInitialCards()
            .then(initialCards => {
                // отрисовываю массив с начальными карточками через создание экзепляра класса Section
                const section = new Section({
                    // задаю значения параметров конструктора класса Section
                    items: initialCards,
                    renderer: (item) => {
                        //создаю экземпляр класса Card вместе с обработчиком удаления карточки
                        const newCard = createCardExample(item, result);
                        //отрисовываю карточку (создаю ДомНоду)
                        return newCard.renderExistedCard();
                    }
                },
                    '.elements');
                //вставляю карточки в разметку
                section.renderSection();
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            })
    })

//создаю обработчик формы редактирования аватара
const editAvatarPopupForm = new PopupWithForm('.popup_edit-avatar', (values) => {
    renderLoading(formEditAvatar, 'Сохранение...');
    //отправляю новую фото аватара на сервер
    api.patchAvatar(
        JSON.stringify({
            avatar: values.field1
        }))
        //в случае успеха отрабатывает обработчик формы
        .then(() => {
            //вставляю в разметку новый путь к фото аватара
            document.querySelector('.avatar__photo')
                .setAttribute("src", values.field1);
            //возвращаю старое название кнопке Сохранить
            renderLoading(formEditAvatar, 'Сохранить');
            //закрываю попап методом экзкмпляра класса PopupWithForm
            editAvatarPopupForm.close();
        })
        .catch((err) => {
            console.log(err);
        });
})
//прикрепляю обработчик к форме
editAvatarPopupForm.setEventListeners();

//программирую нажатие на аватар
avatar.addEventListener('click', () => {
    // очищаю поля ввода от индикации ошибок
    popupEditAvatarValidation.resetValidation();
    //обнуляю поля формы Add button (+) для следующего ввода
    popupEditAvatarValidation.eraseInputText();
    editAvatarPopupForm.open();
})
//создаю обработчик формы edit info
// создаю экземпляр класса PopupWithForm для попапа edit info
const editInfoPopupForm = new PopupWithForm('.popup_edit-info', (values) => {
    //перед запросом на сервер меняю текст кнопки попапа
    renderLoading(formEditInfo, 'Сохранение...');
    //заменяю данные о пользователе на сервере
    api.patchUserInfo(JSON.stringify({
        name: values.field1,
        about: values.field2
    }))
        //в случае успеха 
        .then(() => {
            //задаю даныые о пользоваетеле методом класса UserInfo
            userInfo.setUserInfo(
                values.field1,
                values.field2
            );
            // возвращаю старое название кнопке Сохранить
            renderLoading(formEditInfo, 'Сохранить');
            //закрываю попап методом класса PopupWithForm
            editInfoPopupForm.close();
        })
        .catch((err) => {
            console.log(err);
        });
});
// Прикрепляею обработчик к форме в созданном экземпляре попапа
editInfoPopupForm.setEventListeners();

//программирую нажатие кнопки "Редактировать" (editButton)
editButton.addEventListener('click', function pressEditButton() {
    //получаю объект с данными пользователя
    const user = userInfo.getUserInfo();
    //помещаю полученные данные пользователя в разметку блока Info
    userInfo.setUserInfo(user.name, user.info);
    // помещаю полученные данные пользователя в поля формы при первом открытии
    document.querySelector('.form__input_info_name').value = user.name;
    document.querySelector('.form__input_info_engagement').value = user.info;
    //очищаю поля ввода от индикации ошибок
    popupEditInfoValidator.resetValidation();
    //открываю попап для редактирования user Info
    editInfoPopupForm.open();
});

// создаю обработчик для формы add element
// создаю экземпляр класса PopupWithForm для попапа add element
const addElementPopupForm = new PopupWithForm('.popup_add-element', (values) => {
    // в качестве параметров функции использую значения, полученные в input и задаю пустой массив лайкнувших
    const item = {
        name: values.field1,
        link: values.field2,
        likes: []
    };
    //создаю экземпляр класса Card вместе с обработчиком удаления карточки
    const newCard = createCardExample(item, item);
    //вставляю контент из инпута в карточку
    const renderedNewCard = newCard.renderNewCard();
    //добалвяю в разметку карточки кнопку ее удаления и 
    //навешенный слушатель-обработчик удаления карточки
    newCard.makeCardRemovable();
    //вставляю разметку добавленной карточкои в elements через создание экземляра класса Section
    const section = new Section({
        // задаю значения параметров конструктора класса Section
        items: item,
        renderer: renderedNewCard
    },
        '.elements');
    section.addItem(renderedNewCard);
    // закрываю попап методом из класса PopupWithForm, содержащий очистку полей
    addElementPopupForm.close()
});
// Прикрепляю обработчик к форме в созданном экземпляре попапа
addElementPopupForm.setEventListeners();

// программирую нажатие кнопки "Добавить" (+) (addButton)
addButton.addEventListener('click', function pressAddButton() {
    // очищаю поля ввода от индикации ошибок
    popupAddElementValidator.resetValidation()
    //обнуляю поля формы Add button (+) для следующего ввода
    popupAddElementValidator.eraseInputText();
    // openPopup(popupAddElement);
    addElementPopupForm.open();
});

// задаю правила валидации через создание экзепляров класса FormValidate для каждого попапа с формой ввода
const popupEditInfoValidator = new FormValidator(config, formEditInfo);

popupEditInfoValidator.enableValidation();

const popupAddElementValidator = new FormValidator(config, formAddElement);

popupAddElementValidator.enableValidation();

const popupEditAvatarValidation = new FormValidator(config, formEditAvatar);

popupEditAvatarValidation.enableValidation();