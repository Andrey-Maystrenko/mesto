// помещая код всего ПОПАПА в константу
const popupElement = document.querySelector('.popup');

//помещаю код кнопки "Закрыть" в константу
const closeButton = document.querySelector('.popup__close-button');

//помещаю код кнопки "Редактировать" инфо в константу
const editButton = document.querySelector('.info__edit-button');

//помещаю код поля ввода ИМЕНИ в константу
const inputName = document.querySelector('.popup__input-name');

//помещаю код поля ввода РОДА ЗАНЯТИЙ в константу
const inputEngagement = document.querySelector('.popup__input-engagement');

//помещаю код всей ФОРМЫ ввода в константу
const formElement = document.querySelector('.form');

//помещаю код кнопки "Сохранить" в константу
const saveButton = document.querySelector('.popup__save-button');

//помеащю код ИМЕНИ в блоке ИНФО в переменную
let infoName = document.querySelector('.info__name');

//помещаю код РОДА ЗАНЯТИЙ в блоке ИНФО в переменную
let infoEngagement = document.querySelector('.info__engagement');

//программирую нажатие кнопки "Редактировать"
editButton.addEventListener('click', () => {

    //добавяю в код ПОПАПА класс, отвечающий за отображение ПОПАПА
    popupElement.classList.add('popup__opened');

    //задаю значение поля ввода ИМЕНИ - извлекаю текст из кода ИМЕНИ в блоке ИНФО
    inputName.value = infoName.textContent;
    //задаю значение поля ввода РОДА ЗАНЯТИЙ - извлекаю текст из кода РОДА ЗАНЯТИЙ в блоке ИНФО
    inputEngagement.value = infoEngagement.textContent;
})

//задаю функцию закрытия ПОПАПА - удаляю из кода ПОПАПА класс, отвечающий за отображение ПОПАПА
function closePopup() {
    popupElement.classList.remove('popup__opened');
};

//программирую нажатие кнопки "Закрыть" - по клику срабатывает функция закрытия ПОПАПА, 
//никакие значения полей ввода нигде на сохраняются
closeButton.addEventListener('click', closePopup);

// Обработчик «отправки» формы, хотя пока, она никуда отправляться не будет
// задаю функцию сохранения значний полей ИМЯ и РОД ЗАНЯТИЙ
function formSubmitHandler(evt) {

    // Эта строчка отменяет стандартную отправку формы.
    evt.preventDefault();

    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей

    //помещаю в переменную значение поля ввода ИМЕНИ
    let nameValue = inputName.value;
    //помещаю в переменную значение поля ввода РОДА ЗАНЯТИЙ
    let engagementValue = inputEngagement.value;

    // Вставьте новые значения с помощью textContent

    //вставляю в код ИМЕНИ в блоке ИНФО значение поля ввода ИМЕНИ
    infoName.textContent = nameValue;

    //вставляю в код РОДА ЗАНЯТИЙ в блоке ИНФО значение поля ввода РОДА ЗАНЯТИЙ
    infoEngagement.textContent = engagementValue;

    //закрываю ПОПАП функцией
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»

//во всем коде, вложженном в тэг с классом .form (во всей форме) ищем тэг с типом 'submit'
// и в случае submit=true запускаем функцию "отправки" формы
formElement.addEventListener('submit', formSubmitHandler);
