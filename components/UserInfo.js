export class UserInfo {
    constructor({ userNameSelector, userInfoSelector }) {
        this.userNameSelector = userNameSelector;
        this.userInfoSelector = userInfoSelector;
        this.userName = document.querySelector(this.userNameSelector);
        this.userInfo = document.querySelector(this.userInfoSelector)
    }
    getUserInfo() {
        const user = {
            name: this.userName.textContent,
            info: this.userInfo.textContent
        };
        return user
    }
    setUserInfo(newUserName, newUserInfo) {
        if (newUserName) {
            console.log('newUserName', newUserName);
        } else { console.log('не получено newUserName с вервера', newUserName); }
        this.userName.textContent = newUserName;
        this.userInfo.textContent = newUserInfo;
    }
}