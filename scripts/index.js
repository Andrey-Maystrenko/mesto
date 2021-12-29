import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { Section } from './Section.js';
import { Popup } from './Popup.js';
import { PopupWithForm } from './PopupWithForm.js';
import { UserInfo } from './UserInfo.js';
import '../pages/index.css';
import { PopupWithImage } from './PopupWithImage.js';

const popupWithImage = new PopupWithImage(
    document.querySelector('.popup__mask-group-full-size'),
    document.querySelector('.popup__title-mask-group'),
    '.popup_mask-group');
const editInfoPopup = new Popup('.popup_edit-info');
const addElementPopup = new Popup('.popup_add-element');
const userInfo = new UserInfo({
    userNameSelector: '.info__name',
    userInfoSelector: '.info__engagement'
});

//помещаю код кнопки "Редактировать" инфо в константу
const editButton = document.querySelector('.info__edit-button');

//помещаю код кнопки "Добваить" картинку/карточку в константу
const addButton = document.querySelector('.profile__add-button');

//помещаю код всей ФОРМЫ ввода для "Edit info" в константу
const formEditInfo = document.querySelector('.form_edit-info');

//помещаю код всей ФОРМЫ ввода для "Form element" в константу
const formAddElement = document.querySelector('.form_add-element');

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

// задаю массив с начальным содержанием карточек
const initialCards = [
    {
        name: 'Анапа',
        link: require('../images/anapa.jpg')
    },
    {
        name: 'Новороссийск',
        link: require('../images/novorossiysk.jpg')
    },
    {
        name: 'Геленджик',
        link: require('../images/gelendzhik.jpg')
    },
    {
        name: 'Лазаревское',
        link: require('../images/lazarevskoe.jpg')
    },
    {
        name: 'Сочи',
        link: require('../images/sochi.jpg')
    },
    {
        name: 'Адлер',
        link: require('../images/adler.jpg')
    }
];
//задаю функцию удаления индикации поля при ошибке
function removeErrorIndication() {
    inputFields.forEach(item => {
        item.classList.remove('form__input_error');
    });
}
//задаю функцию удаления текста ошибки
function deleteErrorMessage() {
    errorTexts.forEach(item => {
        item.textContent = '';
    });
}
//задаю функции очистки полей по закрытии ПОПАПА
function eraseInputText() {
    inputFields.forEach((item) => {
        item.value = '';
    })
}
//задаю функцию деактивации кнопки сохранения данных ПОПАПА
function deactivateSaveButton() {
    saveButtons.forEach((item) => {
        item.disabled = true;
        item.classList.add('popup__save-button_disabled');
    });
}
//созодаю обработчик формы edit info
// создаю экземпляр класса PopupWithForm для попапа edit info
const editInfoPopupForm = new PopupWithForm('.popup_edit-info', (evt) => {
    // Эта строчка отменяет стандартную отправку формы.
    evt.preventDefault();

    userInfo.setUserInfo(
        editInfoPopupForm._getInputValues()[0],
        editInfoPopupForm._getInputValues()[1]
    );
    editInfoPopupForm.close();
})
// Прикрепляем обработчик к форме в созданном экземпляре попапа
editInfoPopupForm.setEventListeners();

// создаю обработчик для формы add element
// создаю экземпляр класса PopupWithForm для попапа add element
const addElementPopupForm = new PopupWithForm('.popup_add-element', (evt) => {
    // Эта строчка отменяет стандартную отправку формы.
    evt.preventDefault();
    // в качестве параметров функции использую значения, полученные в input
    const item = {
        name: addElementPopupForm._getInputValues()[0],
        link: addElementPopupForm._getInputValues()[1]
    };
    //клонирую ДомНоду карточки
    const newCard = new Card(item, templateSelector, popupWithImage.handleCardClick);
    //вставляю контент из инпута в карточку
    const renderedNewCard = newCard.renderCard();
    //вставляю разметку добавленной карточкои в elements
    section.addItem(renderedNewCard);
    // закрываю попап методом из класса PopupWithForm, содержащий очистку полей
    addElementPopupForm.close()
});
// Прикрепляем обработчик к форме в созданном экземпляре попапа
addElementPopupForm.setEventListeners();

//программирую нажатие кнопки "Редактировать" (editButton)
editButton.addEventListener('click', () => {
    //получаю объект с данными пользователя
    const user = userInfo.getUserInfo();
    //помещаю полученные данные пользователя в разметку блока Info
    // и поля формы при первом открытии 
    userInfo.setUserInfo(user.name, user.info);
    //удаляю индикацию поля при ошибке
    removeErrorIndication()
    //удаляю текст сообщения об ошибке для всех полей ПОПАПА
    deleteErrorMessage()
    //деактивирую кнопку сохранения ПОПАПА
    deactivateSaveButton();
    //открываю попап для кнопки "Редактировать"
    editInfoPopup.open();
    // openPopup(popupEditInfo);
});
// программирую нажатие кнопки "Добавить" (+) (addButton)
addButton.addEventListener('click', () => {
    //удаляю индикацию поля при ошибке
    removeErrorIndication()
    //удаляю текст сообщения об ошибке для всех полей ПОПАПА
    deleteErrorMessage()
    //обнуляю поля формы Add button (+) для следующего ввода
    eraseInputText()
    //деактивирую кнопку сохранения ПОПАПА
    deactivateSaveButton();
    // openPopup(popupAddElement);
    addElementPopup.open();
});
// создаю массив с начальными карточками через создание экзепляра класса Section
const section = new Section({
    // задаю значения параметров конструктора класса Section
    items: initialCards,
    renderer: (item) => {
        const newCard = new Card(item, templateSelector, popupWithImage.handleCardClick);
        return newCard.renderCard();
    }
},
    '.elements');

section.renderSection();

// задаю правила валидации через создание экзепляров класса FormValidate для каждого попапа с формой ввода
const popupEditInfoValidator = new FormValidator(config, formEditInfo);

popupEditInfoValidator.enableValidation();

const popupAddElementValidator = new FormValidator(config, formAddElement);

popupAddElementValidator.enableValidation();
