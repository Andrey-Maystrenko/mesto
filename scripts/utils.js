//задаю функцию открытия ПОПАПА
export function openPopup(popupElement) {
    //добавяю в код ПОПАПА класс, отвечающий за отображение ПОПАПА
    popupElement.classList.add('popup_opened');
    //навешиваю событие закрытия ПОПАПА по нажатию esc
    document.addEventListener('keydown', closeByEsc);
}

//задаю функцию закрытия ПОПАПА - удаляю из кода ПОПАПА класс, отвечающий за отображение ПОПАПА
export function closePopup(popupElement) {
    //удаляяю событие закрытия ПОПАПА по нажатию esc
    document.removeEventListener('keydown', closeByEsc);
    //удаляю клас, отвечающий за отображение ПОПАПА
    popupElement.classList.remove('popup_opened');
};

//задаю функцию закрытия ПОПАПА по нажатию esc
export function closeByEsc(evt) {
    //помещаю в переменную элемент открытого в настоящий момент ПОПАПА
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}