//помещаю в переменную ПОПАП для Edit button
const popupEditInfo = document.querySelector('.popup_edit-info');

// помещаю в переменную ПОПАП для Add button
const popupAddElement = document.querySelector('.popup_add-element');

// помещаю в переменную ПОПАП для КАРТИНКИ full size
const popupImage = document.querySelector('.popup_mask-group');

//помещаю код кнопки "Закрыть" для ПОПАПА "Edit info" в константу
const closeEditButton = document.querySelector('.popup__close-button_info');

//помещаю код кнопки "Закрыть" для ПОПАПА "Add element"в константу
const closeAddButton = document.querySelector('.popup__close-button_element');

// помещаю код кнопки "Закрыть" для ПОПАПА  Mask group в константу
const closeMaskGroupPopup = document.querySelector('.popup__close-button_mask-group');

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

//помещаю в переменную код элемента с классом .elements
const elements = document.querySelector('.elements');
//помещаю в переменнную код разметки карточки template
const template = document.querySelector('.template');

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
//помещаю в переменную функцию клонирования разметки карточки и вставки ее НАЗВАНИЯ и РИСУНКА   
const createCardDomNode = (item) => {
    // помещаю в переменную содержимое тега template (разметка карточки)
    const cardTemplate = template.content.querySelector('.element').cloneNode(true);
    //помещаю в переменную код рисунка карточки и задаю ему 
    //атрибут scr со значением link из массива
    cardTemplate.querySelector('.element__mask-group').setAttribute("src", item.link);
    cardTemplate.querySelector('.element__mask-group').setAttribute("alt", item.name);
    //помещая в переменную код названия карточки и задаю ему название name из массива
    cardTemplate.querySelector('.element__name').textContent = item.name;

    //навешиваю событие на кнопку "УДАЛИТЬ" - удалить DOM node cardTemplate
    const deleteButton = cardTemplate.querySelector('.element__trash');
    deleteButton.addEventListener('click', () => {
        cardTemplate.remove();
    });
    //навешиваю слушатель события на новую кнопку ЛАЙКА
    const likeButton = cardTemplate.querySelector('.element__like');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('element__like_active')
    });
    //навешиваю событие при клике на КАРТИНКУ
    const maskGroup = cardTemplate.querySelector('.element__button-mask-group');
    maskGroup.addEventListener('click', function (event) {
        //определяю на какой элемент кликнули
        const maskGroupTarget = event.target;
        //извелкаю из кода кликнутого элемента путь к КАРТИНКЕ (src)
        const maskGroupTargetImage = maskGroupTarget.getAttribute('src');
        //вставляю путь КАРТИНКИ  в ПОПАП КАРТИНКИ
        document.querySelector('.popup__mask-group-full-size').setAttribute("src", maskGroupTargetImage)
        //извлекаю название КАРТИНКИ
        const elementName = event.currentTarget.parentElement.querySelector('.element__name').textContent;
        //вставляю название КАРТИНКИ в ПОПАП КАРТИНКИ
        document.querySelector('.popup__title-mask-group').textContent = elementName;
        //вставляю атрибут alt в тэг КАРТИНКИ
        document.querySelector('.popup__mask-group-full-size').setAttribute("alt", elementName)
        //открываю ПОПАП КАРТИНКИ
        openPopup(popupImage);
    });
    return cardTemplate;
};
// создаю массив с начальными карточками, помещая его в переменную
const renderedCards = initialCards.map((item) => {
    return createCardDomNode(item)
});
// вставляю массив с начальными карточками в elements
elements.append(...renderedCards);

//задаю функцию открытия ПОПАПА
function openPopup(popupElement) {
    //добавяю в код ПОПАПА класс, отвечающий за отображение ПОПАПА
    popupElement.classList.add('popup_opened');
    //навешиваю событие закрытия ПОПАПА по нажатию esc
    document.addEventListener('keydown', closeByEsc);
}
//задаю функцию закрытия ПОПАПА - удаляю из кода ПОПАПА класс, отвечающий за отображение ПОПАПА
function closePopup(popupElement) {
    //удаляяю событие закрытия ПОПАПА по нажатию esc
    document.removeEventListener('keydown', closeByEsc);
    //удаляю клас, отвечающий за отображение ПОПАПА
    popupElement.classList.remove('popup_opened');
};
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
//задаю функцию закрытия ПОПАПА по нажатию esc
function closeByEsc(evt) {
    //помещаю в переменную элемент открытого в настоящий момент ПОПАПА
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
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
    const newCard = createCardDomNode({
        name: inputElementName.value,
        link: inputElementMaskGroup.value
    });
    //вставляю разметку с добавленной карточкой в elements
    elements.prepend(newCard);
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
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {
            closePopup(popup)
        }
    })
})
