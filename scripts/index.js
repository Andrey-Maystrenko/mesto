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
        //навешиваю событие закрытия КАРТИНКИ по нажатию esc
        document.addEventListener('keydown', (evt) => {
            if (evt.key === 'Escape') {
                closePopup(popupImage);
            }
        });
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
}
//задаю функцию закрытия ПОПАПА - удаляю из кода ПОПАПА класс, отвечающий за отображение ПОПАПА
function closePopup(popupElement) {
    //удаляю форматирование всех полей ввода ПОПАПА при ошибке
    const errorField = popupElement.querySelectorAll('.form__input');
    errorField.forEach(item => {
        item.classList.remove('form__input_error');
    });
    //удаляю текст сообщения об ошибке для всех полей ПОПАПА
    const errorText = popupElement.querySelectorAll('.popup__error');
    errorText.forEach(item => {
        item.textContent = '';
    });
    //обнуляю поля формы Add button (+) для следующего ввода
    inputElementName.value = '';
    inputElementMaskGroup.value = '';
    //удаляю клас, отвечающий за отображение ПОПАПА
    popupElement.classList.remove('popup_opened');
};
// Обработчик «отправки» формы Edit info
// задаю функцию сохранения значний полей ИМЯ и РОД ЗАНЯТИЙ
function formEditSubmitHandler(evt) {
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
formEditInfo.addEventListener('submit', formEditSubmitHandler);

// Обработчик «отправки» формы Add element
// задаю функцию клонирования element из полей ввода name и link
function formAddSubmitHandler(evt) {
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
    inputElementName.value = '';
    inputElementMaskGroup.value = '';
    //закрываю ПОПАП функцией
    closePopup(popupAddElement);
}
// Прикрепляем обработчик к форме:
//во всем коде, вложенном в тэг с классом .form_add-element ищем тэг с типом 'submit'
// и в случае submit=true запускаем функцию "отправки" формы
formAddElement.addEventListener('submit', formAddSubmitHandler);

//программирую нажатие кнопки "Редактировать" (editButton)
editButton.addEventListener('click', () => {
    //задаю значение поля ввода ИМЕНИ - извлекаю текст из кода ИМЕНИ в блоке ИНФО
    inputName.value = infoName.textContent;
    //задаю значение поля ввода РОДА ЗАНЯТИЙ - извлекаю текст из кода РОДА ЗАНЯТИЙ в блоке ИНФО
    inputEngagement.value = infoEngagement.textContent;
    //открываю попап для кнопки "Редактировать"
    openPopup(popupEditInfo);
});

//программирую нажатие кнопки "Закрыть" ПОПАП Edit info, 
closeEditButton.addEventListener('click', () => {
    closePopup(popupEditInfo);
});

//программирую нажатие кнопки "Закрыть" ПОПАП Add element, 
closeAddButton.addEventListener('click', () => {
    //обнуляю содержание полей ввода для последующих вводов
    inputElementName.value = '';
    inputElementMaskGroup.value = '';
    //закрываю попап
    closePopup(popupAddElement);
});

// программирую нажатие кнопки "Добавить" (+) (addButton)
addButton.addEventListener('click', () => {
    openPopup(popupAddElement);
});

//программирую нажатие кнопки "Закрыть" ПОПАП открытия full size КАРТИНКИ, 
closeMaskGroupPopup.addEventListener('click', () => {
    closePopup(popupImage);
});
//программирую закрытиые ПОПАПОВ по нажатию esc
document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closePopup(popupEditInfo);
        closePopup(popupAddElement);
    }
});
//навешиваю на оверлей закрытие ПОПАПА по клику
const overlay = document.querySelectorAll('.popup');
overlay.forEach((item) => {
    item.addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup(item);
        }
    })
});

