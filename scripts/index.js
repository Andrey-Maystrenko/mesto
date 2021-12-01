// помещаю в переменную ПОПАП для add button
const popupAddElement = document.querySelector('.popup_add-element');

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
let infoName = document.querySelector('.info__name');

//помещаю код РОДА ЗАНЯТИЙ в блоке ИНФО в переменную
let infoEngagement = document.querySelector('.info__engagement');

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

    // помещаю в переменную код кнопки "удалить"
    const deleteButton = cardTemplate.querySelector('.element__trash');
    //навешиваю событие на кнопку "удалить" - удалить DOM node cardTemplate
    deleteButton.addEventListener('click', () => {
        cardTemplate.remove();
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
    popupElement.classList.remove('popup_opened');
};

// Обработчик «отправки» формы Edit info
// задаю функцию сохранения значний полей ИМЯ и РОД ЗАНЯТИЙ
function formEditSubmitHandler(evt) {

    // Эта строчка отменяет стандартную отправку формы.
    evt.preventDefault();

    let popupElement = document.querySelector('.popup_edit-info');

    //вставляю в код ИМЕНИ в блоке ИНФО значение поля ввода ИМЕНИ
    infoName.textContent = inputName.value;

    //вставляю в код РОДА ЗАНЯТИЙ в блоке ИНФО значение поля ввода РОДА ЗАНЯТИЙ
    infoEngagement.textContent = inputEngagement.value;

    //закрываю ПОПАП функцией
    closePopup(popupElement);
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

    // помещаю в переменную весь код ПОПАПА Add element
    let popupElement = document.querySelector('.popup_add-element');

    // соpдаю новую карточку функцией создания Дом Нода карточкии 
    // в качестве параметров функции использую значения, полученные в input
    let newCard = createCardDomNode({
        name: inputElementName.value,
        link: inputElementMaskGroup.value
    });
    //вставляю разметку с добавленной карточкой в elements
    elements.prepend(newCard);

    //помещаю в переменную код новой кнопки лайка
    let newLikeButton = newCard.querySelector('.element__like');

    //навешиваю слушатель события на новую кнопку лайка
    newLikeButton.addEventListener('click', () => {
        newLikeButton.classList.toggle('element__like_active')
    });

    //помещаю в переменную код кнопки-картинки для новой карточки 
    let newMaskGroup = newCard.querySelector('.element__button-mask-group');

    //навешиваю слушатель события на новую кнопку-картинку
    newMaskGroup.addEventListener('click', function (event) {
        //определяю на какой элемент кликнули
        let maskGroupTarget = event.target
        //извелкаю из кода кликнутого элемента путь к КАРТИНКЕ (src)
        let maskGroupTargetImage = maskGroupTarget.getAttribute('src');
        //вставляю путь КАРТИНКИ  в ПОПАП КАРТИНКИ
        document.querySelector('.popup__mask-group-full-size').setAttribute("src", maskGroupTargetImage)
        //извлекаю название КАРТИНКИ
        let elementName = event.currentTarget.parentElement.querySelector('.element__name').textContent;
        //вставляю название КАРТИНКИ в ПОПАП КАРТИНКИ
        document.querySelector('.popup__title_mask-group').textContent = elementName;
        //добавляю класс для открытия ПОПАПА КАРТИНКИ
        document.querySelector('.popup_mask-group').classList.add('popup_opened');
    });

    //обнуляю поля формы для следующего ввода
    inputElementName.value = '';
    inputElementMaskGroup.value = '';

    //закрываю ПОПАП функцией
    closePopup(popupElement);
}

// Прикрепляем обработчик к форме:
//во всем коде, вложенном в тэг с классом .form_add-element ищем тэг с типом 'submit'
// и в случае submit=true запускаем функцию "отправки" формы
formAddElement.addEventListener('submit', formAddSubmitHandler);

//программирую нажатие кнопки "Редактировать" (editButton)
editButton.addEventListener('click', () => {

    let popupElement = document.querySelector('.popup_edit-info');


    //помещаю код поля ввода ИМЕНИ в константу
    const inputName = document.querySelector('.form__input_info_name');

    //помещаю код поля ввода РОДА ЗАНЯТИЙ в константу
    const inputEngagement = document.querySelector('.form__input_info_engagement');

    //задаю значение поля ввода ИМЕНИ - извлекаю текст из кода ИМЕНИ в блоке ИНФО
    inputName.value = infoName.textContent;
    //задаю значение поля ввода РОДА ЗАНЯТИЙ - извлекаю текст из кода РОДА ЗАНЯТИЙ в блоке ИНФО
    inputEngagement.value = infoEngagement.textContent;

    openPopup(popupElement);
});

//программирую нажатие кнопки "Закрыть" ПОПАП Edit info, 
closeEditButton.addEventListener('click', () => {
    let popupElement = document.querySelector('.popup_edit-info');

    closePopup(popupElement);
});

//программирую нажатие кнопки "Закрыть" ПОПАП Add element, 
closeAddButton.addEventListener('click', () => {
    let popupElement = document.querySelector('.popup_add-element');
    inputElementName.value = '';
    inputElementMaskGroup.value = '';

    closePopup(popupElement);
});

// программирую нажатие кнопки "Добавить" (+) (addButton)
addButton.addEventListener('click', () => {
    let popupElement = document.querySelector('.popup_add-element');

    openPopup(popupElement);
});

//помещаю в переменную массив с кодом(разметкой) всех элементами ЛАЙК
let like = document.querySelectorAll('.element__like');


//для каждого элемента массива задаю слушатель события, который переключает класс 
like.forEach((item) =>
    item.addEventListener('click', () => {
        item.classList.toggle('element__like_active')
    })
);

//помещаю в переменную массив с разметкой каждой КАРТИНКИ
let maskGroup = document.querySelectorAll('.element__button-mask-group');

//навешиваю событие по клику на каждую КАРТИНКУ
maskGroup.forEach((item) =>
    item.addEventListener('click', function (event) {
        //определяю на какой элемент кликнули
        let maskGroupTarget = event.target
        //извелкаю из кода кликнутого элемента путь к КАРТИНКЕ (src)
        let maskGroupTargetImage = maskGroupTarget.getAttribute('src');
        //вставляю путь КАРТИНКИ  в ПОПАП КАРТИНКИ
        document.querySelector('.popup__mask-group-full-size').setAttribute("src", maskGroupTargetImage)
        //извлекаю название КАРТИНКИ
        let elementName = event.currentTarget.parentElement.querySelector('.element__name').textContent;
        //вставляю название КАРТИНКИ в ПОПАП КАРТИНКИ
        document.querySelector('.popup__title_mask-group').textContent = elementName;
        //добавляю класс для открытия ПОПАПА КАРТИНКИ
        document.querySelector('.popup_mask-group').classList.add('popup_opened');
    }));

//программирую нажатие кнопки "Закрыть" ПОПАП открытия full size КАРТИНКИ, 
closeMaskGroupPopup.addEventListener('click', () => {
    let popupElement = document.querySelector('.popup_mask-group');

    closePopup(popupElement)
});