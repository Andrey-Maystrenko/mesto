import { Api } from "./Api.js";

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-34',
    headers: {
        authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
        'Content-Type': 'application/json'
    }
});

export class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this.userNameSelector = userNameSelector;
        this.userInfoSelector = userInfoSelector
    }
    getUserInfo() {
        const user = {
            name: document.querySelector(this.userNameSelector).textContent,
            info: document.querySelector(this.userInfoSelector).textContent
        };
        return user
    }
    setUserInfo(newUserName, newUserInfo) {
        document.querySelector(this.userNameSelector).textContent = newUserName;
        document.querySelector(this.userInfoSelector).textContent = newUserInfo;
        document.querySelector('.form__input_info_name').value = newUserName;
        document.querySelector('.form__input_info_engagement').value = newUserInfo;

        // //перед запросом на сервер меняю текст кнопки попапа
        // document.querySelector('.popup_edit-info .popup__save-button-text').textContent = 'Сохранение...';

        // api.patchUserInfo(JSON.stringify({
        //     name: newUserName,
        //     about: newUserInfo
        // }))
        //     .then(() => {
        //         //возвращаю старое название кнопке Сохранить
        //         document.querySelector('.popup_edit-info .popup__save-button-text').textContent = 'Сохранить';
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        // fetch('https://mesto.nomoreparties.co/v1/cohort-34/users/me', {
        //     method: 'PATCH',
        //     headers: {
        //         authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         name: newUserName,
        //         about: newUserInfo
        //     })
        // })
    }
}