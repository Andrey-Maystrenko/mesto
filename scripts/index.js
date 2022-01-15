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

popupWithImage.setEventListeners();

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

//запрашиваю с сервера информацию о пользователе - свойства name, about, avatar
fetch('https://nomoreparties.co/v1/cohort-34/users/me', {
    headers: {
        authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8'
    }
})
    .then(res => res.json())
    //вставляю информацию из полученного объекта в разметку
    .then((result) => {
        // console.log(result)
        document.querySelector('.info__name').textContent = result.name;
        document.querySelector('.info__engagement').textContent = result.about;
        document.querySelector('.avatar').setAttribute("src", result.avatar)
    }
    )

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
        editInfoPopupForm.getInputValues()[0],
        editInfoPopupForm.getInputValues()[1]
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
        name: addElementPopupForm.getInputValues()[0],
        link: addElementPopupForm.getInputValues()[1]
    };
    //клонирую ДомНоду карточки
    const newCard = new Card(item, templateSelector, popupWithImage.handleCardClick);
    //вставляю контент из инпута в карточку
    const renderedNewCard = newCard.renderCard();
    //вставляю в разметку добавленной карточки кнопку trash для удаления карточки
    renderedNewCard.insertAdjacentHTML('beforeend', '<button class="element__trash" type="button"></button>');
    renderedNewCard.querySelector('.element__trash').addEventListener('click', newCard._deleteCard);
    //вставляю разметку добавленной карточкои в elements через создание экземляра класса Section
    const section = new Section({
        // задаю значения параметров конструктора класса Section
        items: item,
        renderer: (item) => {
            const newCard = new Card(item, templateSelector, popupWithImage.handleCardClick);
            return newCard.renderCard();
        }
    },
        '.elements');
    section.addItem(renderedNewCard);
    //соханяю добавленную картинку на сервере
    fetch('https://mesto.nomoreparties.co/v1/cohort-34/cards', {
        method: 'POST',
        headers: {
            authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: addElementPopupForm.getInputValues()[0],
            link: addElementPopupForm.getInputValues()[1]
        })
    })
    // закрываю попап методом из класса PopupWithForm, содержащий очистку полей
    addElementPopupForm.close()
});
// Прикрепляем обработчик к форме в созданном экземпляре попапа
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
    //открываю попап для кнопки "Редактировать"
    editInfoPopup.open();
});
// программирую нажатие кнопки "Добавить" (+) (addButton)
addButton.addEventListener('click', function pressAddButton() {
    // очищаю поля ввода от индикации ошибок
    popupAddElementValidator.resetValidation()
    //обнуляю поля формы Add button (+) для следующего ввода
    eraseInputText();
    // openPopup(popupAddElement);
    addElementPopup.open();
});

// //программирую нажатие кнопки "Удалить"
// const trashButton = document.querySelector('.element__trash');
// console.log(`разметка трэш`, trashButton)

// const popupDelete = document.querySelector('.popup_delete');
// console.log(`разметка попапа Удалить`, popupDelete)
// console.log(`разметка кнопки Лайк`, document.querySelector('.element__like'))
// trashButton.addEventListener('click', () => {
//     popupDelete.open()
// })
// получаю массив с начальными карточками
fetch('https://mesto.nomoreparties.co/v1/cohort-34/cards', {
    headers: {
        authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8'
    }
})
    .then(res => res.json())
    .then(initialCards => {
        // отрисовываю массив с начальными карточками через создание экзепляра класса Section
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
    })
// задаю правила валидации через создание экзепляров класса FormValidate для каждого попапа с формой ввода
const popupEditInfoValidator = new FormValidator(config, formEditInfo, inputFields, errorTexts, saveButtons);

popupEditInfoValidator.enableValidation();

const popupAddElementValidator = new FormValidator(config, formAddElement, inputFields, errorTexts, saveButtons);

popupAddElementValidator.enableValidation();

// const popupDeleteElementValidator = new FormValidator(config, formDeleteElement, inputFields, errorTexts, saveButtons);

// popupDeleteElementValidator.enableValidation();

