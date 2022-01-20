export class Api {
    constructor(options) {
        this.options = options;
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-34/cards', {
            headers: {
                authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            });
    }

    patchAvatar(body) {
        return fetch('https://nomoreparties.co/v1/cohort-34/users/me/avatar', {
            method: "PATCH",
            headers: {
                authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            });
    }
    getUserInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-34/users/me', {
            headers: {
                authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
    }
}