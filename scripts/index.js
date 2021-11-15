const popupElement = document.querySelector('.popup');

const closeButton = document.querySelector('.popup__close-button');
// console.log(closeButton);
const editButton = document.querySelector('.info__edit-button');
// console.log(editButton);

let authorName = document.querySelector('popup__input-name');
let engagement = document.querySelector('popup__input-engagement');
let initialName = document.querySelector('info__name');
console.log(initialName.value);
let initialEngagement = document.querySelector('info__engagement')

editButton.addEventListener('click', () => {
    popupElement.classList.add('popup__opened');
    authorName.value = initialName.value;
    engagement.value = initialEngagement.value;

})
// console.log(popupElement);
closeButton.addEventListener('click', () => {
    popupElement.classList.remove('popup__opened');
})