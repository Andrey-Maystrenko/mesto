export class Api {
    constructor() {

    }
    checkLikeAmount() {
        fetch('https://mesto.nomoreparties.co/v1/cohort-34/cards', {
            headers: {
                authorization: 'f6c561df-ef33-43f7-885e-c25f80e98ae8'
            }
        })
            .then(res => res.json())
            .then(result => {
                document.querySelector('.element__like-amount').textContent = result.likes.length
            })
    }
}