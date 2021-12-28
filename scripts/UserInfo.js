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
        document.querySelector('.form__input_info_engagement').value = newUserInfo
    }
}