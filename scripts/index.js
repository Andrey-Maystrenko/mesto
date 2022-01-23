import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import '../pages/index.css';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { Api } from '../components/Api.js';

const popupWithImage = new PopupWithImage(
    document.querySelector('.popup__mask-group-full-size'),
    document.querySelector('.popup__title-mask-group'),
    '.popup_mask-group');

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


//помещаю код всей ФОРМЫ ввода для "Delete element" в константу
const formDeleteElement = document.querySelector('.form_delete');

//помещаю в переменную массив со всеми кнопками сохранения/отправки формы ПОПАПОВ
const saveButtons = document.querySelectorAll('.popup__save-button');

//помещаю в переменную массив со всеми элементами полей ввода
const inputFields = document.querySelectorAll('.form__input');

//помещаю в переменную массив со всеми span'ами с текстом ошибки
const errorTexts = document.querySelectorAll('.popup__error');

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

//помещаю в переменную попап аватара
const avatarOverlay = document.querySelector('.avatar__overlay');

//задаю функции очистки полей по закрытии ПОПАПА
function eraseInputText() {
    inputFields.forEach((item) => {
        item.value = '';
    })
}
//отрисовываю начальные данные о пользователе - свойства name, about, avatar
//запрашиваю с сервера информацию о пользователе - свойства name, about, avatar
api.getUserInfo()
    //вставляю информацию из полученного объекта в разметку
    .then((result) => {
        document.querySelector('.info__name').textContent = result.name;
        document.querySelector('.info__engagement').textContent = result.about;
        document.querySelector('.avatar__photo').setAttribute("src", result.avatar);
        // получаю с сервера массив с дданными начальных карточек для их рендеринга
        api.getInitialCards()
            .then(initialCards => {
                // отрисовываю массив с начальными карточками через создание экзепляра класса Section
                const section = new Section({
                    // задаю значения параметров конструктора класса Section
                    items: initialCards,
                    renderer: (item) => {
                        const newCard = new Card(item, templateSelector, popupWithImage.handleCardClick, result.name);
                        return newCard.renderExistedCard();
                    }
                },
                    '.elements');
                section.renderSection();
            })
    })
//задаю функцию наложения оверлея попапа аватара при наведении мыши
function openAvatarPopup() {
    avatarOverlay.classList.add('popup_opened')
}
//задаю функцию снятия оверлея попапа аватара при убирании с него мыши
function closeAvatarPopup() {
    avatarOverlay.classList.remove('popup_opened')
}
//добавляю слушатель события для отображения попапа аватара (для редактирования аватара)
avatar.addEventListener('mouseover', openAvatarPopup);
//добавляю слушатель события для исчезновения попапа аватара (для редактирования аватара)
avatar.addEventListener('mouseout', closeAvatarPopup);

//создаю обработчик формы редактирования аватара
const editAvatarPopupForm = new PopupWithForm('.popup_edit-avatar', (evt) => {
    // Эта строчка отменяет стандартную отправку формы.
    evt.preventDefault();
    //перед запросом на сервер меняю текст кнопки попапа
    document.querySelector('.popup_edit-avatar .popup__save-button-text').textContent = 'Сохранение...';
    //отправляю новую фото аватара на сервер
    api.patchAvatar(
        JSON.stringify({
            avatar: editAvatarPopupForm.getInputValues()[0]
        }))
        //в случае успеха отрабатывает обработчик формы
        .then(() => {
            //возвращаю старое название кнопке Сохранить
            document.querySelector('.popup_edit-avatar .popup__save-button-text').textContent = 'Сохранить';
        })
        .catch((err) => {
            console.log(err);
        });
    //вставляю в разметку новый путь к фото аватара
    document.querySelector('.avatar__photo').setAttribute("src", editAvatarPopupForm.getInputValues()[0]);
    //закрываю попап методом экзкмпляра класса PopupWithForm
    editAvatarPopupForm.close();
})
//прикрепляю обработчик к форме
editAvatarPopupForm.setEventListeners();

//программирую нажатие на аватар
avatar.addEventListener('click', () => {
    // очищаю поля ввода от индикации ошибок
    popupEditAvatarValidation.resetValidation();
    //обнуляю поля формы Add button (+) для следующего ввода
    eraseInputText();
    editAvatarPopupForm.open();
})
//создаю обработчик формы edit info
// создаю экземпляр класса PopupWithForm для попапа edit info
const editInfoPopupForm = new PopupWithForm('.popup_edit-info', (evt) => {
    // Эта строчка отменяет стандартную отправку формы.
    evt.preventDefault();
    //задаю данные о пользователе методом экземпляра класса UserInfo
    userInfo.setUserInfo(
        editInfoPopupForm.getInputValues()[0],
        editInfoPopupForm.getInputValues()[1]
    );
    //перед запросом на сервер меняю текст кнопки попапа
    document.querySelector('.popup_edit-info .popup__save-button-text').textContent = 'Сохранение...';
    //заменяю данные о пользователе на сервере
    api.patchUserInfo(JSON.stringify({
        name: editInfoPopupForm.getInputValues()[0],
        about: editInfoPopupForm.getInputValues()[1]
    }))
        .then(() => {
            //возвращаю старое название кнопке Сохранить
            document.querySelector('.popup_edit-info .popup__save-button-text').textContent = 'Сохранить';
        })
        .catch((err) => {
            console.log(err);
        });
    //закрываю попап методом класса PopupWithForm
    editInfoPopupForm.close();
})
// Прикрепляею обработчик к форме в созданном экземпляре попапа
editInfoPopupForm.setEventListeners();

// создаю обработчик для формы add element
// создаю экземпляр класса PopupWithForm для попапа add element
const addElementPopupForm = new PopupWithForm('.popup_add-element', (evt) => {
    // Эта строчка отменяет стандартную отправку формы.
    evt.preventDefault();
    // в качестве параметров функции использую значения, полученные в input и задаю пустой массив лайкнувших
    const item = {
        name: addElementPopupForm.getInputValues()[0],
        link: addElementPopupForm.getInputValues()[1],
        likes: []
    };
    //клонирую ДомНоду карточки
    const newCard = new Card(item, templateSelector, popupWithImage.handleCardClick);
    //вставляю контент из инпута в карточку
    const renderedNewCard = newCard.renderNewCard();
    //добалвяю в разметку карточки кнопку ее удаления со всем функционалом
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

//программирую нажатие кнопки "Редактировать" (editButton)
editButton.addEventListener('click', function pressEditBatton() {
    //получаю объект с данными пользователя
    const user = userInfo.getUserInfo();
    //помещаю полученные данные пользователя в разметку блока Info
    // и поля формы при первом открытии 
    userInfo.setUserInfo(user.name, user.info);
    //очищаю поля ввода от индикации ошибок
    popupEditInfoValidator.resetValidation();
    //открываю попап для редактирования user Info
    editInfoPopupForm.open();
});
// программирую нажатие кнопки "Добавить" (+) (addButton)
addButton.addEventListener('click', function pressAddButton() {
    // очищаю поля ввода от индикации ошибок
    popupAddElementValidator.resetValidation()
    //обнуляю поля формы Add button (+) для следующего ввода
    eraseInputText();
    // openPopup(popupAddElement);
    addElementPopupForm.open();
});


// задаю правила валидации через создание экзепляров класса FormValidate для каждого попапа с формой ввода
const popupEditInfoValidator = new FormValidator(config, formEditInfo, inputFields, errorTexts, saveButtons);

popupEditInfoValidator.enableValidation();

const popupAddElementValidator = new FormValidator(config, formAddElement, inputFields, errorTexts, saveButtons);

popupAddElementValidator.enableValidation();

const popupEditAvatarValidation = new FormValidator(config, formEditAvatar, inputFields, errorTexts, saveButtons);

popupEditAvatarValidation.enableValidation();

// задаю массив с начальным содержанием карточек
// const initialCards = [
//     {
//         name: 'Анапа',
//         link: require('../images/anapa.jpg')
//     },
//     {
//         name: 'Новороссийск',
//         link: require('../images/novorossiysk.jpg')
//     },
//     {
//         name: 'Геленджик',
//         link: require('../images/gelendzhik.jpg')
//     },
//     {
//         name: 'Лазаревское',
//         link: require('../images/lazarevskoe.jpg')
//     },
//     {
//         name: 'Сочи',
//         link: require('../images/sochi.jpg')
//     },
//     {
//         name: 'Адлер',
//         link: require('../images/adler.jpg')
//     }
// ];