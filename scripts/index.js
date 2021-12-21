import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup } from './utils.js';
import { closePopup } from './utils.js';

//помещаю в переменную ПОПАП для Edit button
const popupEditInfo = document.querySelector('.popup_edit-info');

// помещаю в переменную ПОПАП для Add button
const popupAddElement = document.querySelector('.popup_add-element');

//помещаю код кнопки "Редактировать" инфо в константу
const editButton = document.querySelector('.info__edit-button');

//помещаю код кнопки "Добваить" картинку/карточку в константу
const addButton = document.querySelector('.profile__add-button');

//помещаю код всей ФОРМЫ ввода для "Edit info" в константу
const formEditInfo = document.querySelector('.form_edit-info');

//помещаю код всей ФОРМЫ ввода для "Form element" в константу
const formAddElement = document.querySelector('.form_add-element');

//помеащю код ИМЕНИ в блоке ИНФО в переменную
const infoName = document.querySelector('.info__name');

//помещаю код РОДА ЗАНЯТИЙ в блоке ИНФО в переменную
const infoEngagement = document.querySelector('.info__engagement');

// помещаю в переменную код поля ввода ИМЕНИ автора
const inputName = document.querySelector('.form__input_info_name');

// помещаю в переменную код поля ввода РОДА ЗАНЯТИЙ автора
const inputEngagement = document.querySelector('.form__input_info_engagement');

//помещаю код поля ввода НАЗВАНИЯ КАРТИНКИ в константу
const inputElementName = document.querySelector('.form__input_element_name');

//помещаю код поля ввода ССЫЛКИ НА КАРТИНКИ в константу
const inputElementMaskGroup = document.querySelector('.form__input_element_mask-group');

//помещаю в переменную массив со всеми кнопками сохранения/отправки формы ПОПАПОВ
const saveButtons = document.querySelectorAll('.popup__save-button');

//помещаю в переменную массив со всеми элементами полей ввода
const inputFields = document.querySelectorAll('.form__input');

//помещаю в переменную массив со всеми span'ами с текстом ошибки
const errorTexts = document.querySelectorAll('.popup__error');

//помещаю в переменную массив со всеми ПОПАПАМИ
const popups = document.querySelectorAll('.popup');

//помещаю в переменную html код КАРТИНКИ ПОПАПА КАРИНКИ
const imagePopup = document.querySelector('.popup__mask-group-full-size');

//помещаю в переменную html код НАЗВАНИЯ КАРТИНКИ ПОПАПА КАРИНКИ
const imagePopupTitle = document.querySelector('.popup__title-mask-group');

const config = {
    inputSelector: '.form__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'form__input_error',
    errorClass: 'popup__error_visible',
}

//помещаю в переменную код элемента с классом .elements
const elements = document.querySelector('.elements');

//помещаю в переменнную селектор template'a разметки карточки 
const templateSelector = ".template";

// задаю массив с начальным содержанием карточек
const initialCards = [
    {
        name: 'Анапа',
        link: './images/anapa.jpg'
    },
    {
        name: 'Новороссийск',
        link: './images/novorossiysk.jpg'
    },
    {
        name: 'Геленджик',
        link: './images/gelendzhik.jpg'
    },
    {
        name: 'Лазаревское',
        link: './images/lazarevskoe.jpg'
    },
    {
        name: 'Сочи',
        link: './images/sochi.jpg'
    },
    {
        name: 'Адлер',
        link: './images/adler.jpg'
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

// Обработчик «отправки» формы Edit info
// задаю функцию сохранения значний полей ИМЯ и РОД ЗАНЯТИЙ
function handleEditSubmitForm(evt) {
    // Эта строчка отменяет стандартную отправку формы.
    evt.preventDefault();
    // const popupElement = document.querySelector('.popup_edit-info');
    //вставляю в код ИМЕНИ в блоке ИНФО значение поля ввода ИМЕНИ
    infoName.textContent = inputName.value;
    //вставляю в код РОДА ЗАНЯТИЙ в блоке ИНФО значение поля ввода РОДА ЗАНЯТИЙ
    infoEngagement.textContent = inputEngagement.value;
    //закрываю ПОПАП функцией
    closePopup(popupEditInfo);
}
// Прикрепляем обработчик к форме:
//во всем коде, вложенном в тэг с классом .form_edit-info ищем тэг с типом 'submit'
// и в случае submit=true запускаем функцию "отправки" формы
formEditInfo.addEventListener('submit', handleEditSubmitForm);

// Обработчик «отправки» формы Add element
// задаю функцию клонирования element из полей ввода name и link
function handleAddSubmitForm(evt) {
    // Эта строчка отменяет стандартную отправку формы.
    evt.preventDefault();
    // соpдаю новую карточку функцией создания Дом Нода карточкии 
    // в качестве параметров функции использую значения, полученные в input
    const item = {
        name: inputElementName.value,
        link: inputElementMaskGroup.value
    };
    //клонирую ДомНоду карточки
    const newCard = new Card(imagePopup, imagePopupTitle, item, templateSelector);
    //вставляю контент из инпута в карточку
    const renderedNewCard = newCard.renderCard();
    //вставляю разметку добавленной карточкои в elements
    elements.prepend(renderedNewCard);
    //обнуляю поля формы для следующего ввода
    eraseInputText()
    //закрываю ПОПАП функцией
    closePopup(popupAddElement);
}
// Прикрепляем обработчик к форме:
//во всем коде, вложенном в тэг с классом .form_add-element ищем тэг с типом 'submit'
// и в случае submit=true запускаем функцию "отправки" формы
formAddElement.addEventListener('submit', handleAddSubmitForm);

//программирую нажатие кнопки "Редактировать" (editButton)
editButton.addEventListener('click', () => {
    //задаю значение поля ввода ИМЕНИ - извлекаю текст из кода ИМЕНИ в блоке ИНФО
    inputName.value = infoName.textContent;
    //задаю значение поля ввода РОДА ЗАНЯТИЙ - извлекаю текст из кода РОДА ЗАНЯТИЙ в блоке ИНФО
    inputEngagement.value = infoEngagement.textContent;
    //удаляю индикацию поля при ошибке
    removeErrorIndication()
    //удаляю текст сообщения об ошибке для всех полей ПОПАПА
    deleteErrorMessage()
    //деактивирую кнопку сохранения ПОПАПА
    deactivateSaveButton();
    //открываю попап для кнопки "Редактировать"
    openPopup(popupEditInfo);
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
    openPopup(popupAddElement);
});
//программирую закрытие ПОПАПА по клику (на крестик или на оверлей)
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if ((evt.target.classList.contains('popup_opened')) ||
            (evt.target.classList.contains('popup__close-button'))) {
            closePopup(popup)
        }
    })
});

// создаю массив с начальными карточками
const renderedCards = initialCards.map((item) => {
    const newCard = new Card(imagePopup, imagePopupTitle, item, templateSelector);
    return newCard.renderCard();
});

// вставляю массив с начальными карточками в elements
elements.append(...renderedCards);

const popupEditInfoValidator = new FormValidator(config, formEditInfo);

popupEditInfoValidator.enableValidation();

const popupAddElementValidator = new FormValidator(config, formAddElement);

popupAddElementValidator.enableValidation();
