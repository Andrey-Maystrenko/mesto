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
const editAvatarPopup = new Popup('.popup_edit-avatar');
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

//задаю функции очистки полей по закрытии ПОПАПА
function eraseInputText() {
    inputFields.forEach((item) => {
        item.value = '';
    })
}

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
        document.querySelector('.avatar__photo').setAttribute("src", result.avatar)
    }
    )

//помещаю в переменную разметку аватара
const avatar = document.querySelector('.avatar');
//помещаю в переменную попап аватара
const avatarOverlay = document.querySelector('.avatar__overlay');
console.log(avatarOverlay)
function openAvatarPopup() {
    avatarOverlay.classList.add('popup_opened')
}
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
    //вставляю в разметку новый путь к фото аватара
    document.querySelector('.avatar__photo').setAttribute("src", editAvatarPopupForm.getInputValues()[0]);
    //отправляю новую фото аватара на сервер
    fetch('https://nomoreparties.co/v1/cohort-34/users/me/avatar', {
        method: "PATCH",
        headers: {
            authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: editAvatarPopupForm.getInputValues()[0]
        })
    })
    editAvatarPopupForm.close()
})
//прикрепляю обработчик к форме
editAvatarPopupForm.setEventListeners();

//программирую нажатие на аватар
avatar.addEventListener('click', () => {
    // очищаю поля ввода от индикации ошибок
    popupEditAvatarValidation.resetValidation();
    //обнуляю поля формы Add button (+) для следующего ввода
    eraseInputText();
    editAvatarPopup.open();
})


//создаю обработчик формы edit info
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
    // в качестве параметров функции использую значения, полученные в input и задаю пустой массив лайкнувших
    const item = {
        name: addElementPopupForm.getInputValues()[0],
        link: addElementPopupForm.getInputValues()[1],
        likes: []
    };
    //клонирую ДомНоду карточки
    const newCard = new Card(item, templateSelector, popupWithImage.handleCardClick);
    //вставляю контент из инпута в карточку
    const renderedNewCard = newCard.renderCard();
    //вставляю в разметку добавленной карточки кнопку trash для удаления карточки
    renderedNewCard.insertAdjacentHTML('beforeend', '<button class="element__trash" type="button"></button>');
    //навешиваю на кнопку trash слушатель для обработки удаления созданной отдельной карточки
    renderedNewCard.querySelector('.element__trash').addEventListener('click', newCard._deleteCard);
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

// получаю массив с начальными карточками
fetch('https://mesto.nomoreparties.co/v1/cohort-34/cards', {
    headers: {
        authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8'
    }
})
    .then(res => res.json())
    .then(initialCards => {
        // console.log(initialCards);
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

const popupEditAvatarValidation = new FormValidator(config, formEditAvatar, inputFields, errorTexts, saveButtons);

popupEditAvatarValidation.enableValidation();

