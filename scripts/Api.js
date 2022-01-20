export class Api {
    constructor(options) {
        this.options = options;
    }

    getUserInfo() {
        return fetch('https://nomoreparties.co/v1/cohort-34/users/me', {
            headers: {
                authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            })
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-34/cards', {
            headers: {
                authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8'
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
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
                    return res.json()
                }
            });

        // .then(res => {
        //     if (res.ok) {
        //         return res.json();
        //     }
        //     // если ошибка, отклоняем промис
        //     return Promise.reject(`Ошибка: ${res.status}`);
        // });
    };

    patchUserInfo(body) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-34/users/me', {
            method: 'PATCH',
            headers: {
                authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            });
    }

    postNewCard(body) {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-34/cards', {
            method: 'POST',
            headers: {
                authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
                'Content-Type': 'application/json'
            },
            body: body
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                }
            });
    }
    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-34/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8',
            }
        })
    }
    putLike(body, cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-34/cards/${cardId}/likes `, {
            method: 'PUT',
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
            })
    }
    deleteLike(body, cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-34/cards/${cardId}/likes `, {
            method: 'DELETE',
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
            })
    }
}