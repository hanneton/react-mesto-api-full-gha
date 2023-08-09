class Api {
    constructor(urlBase, headers) {
        this._urlBase = urlBase;
        this._headers = headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`)
    }

    getInitialInfo() {
        return fetch(`${this._urlBase}/users/me`, {
            headers: this._headers,
            method: "GET"
        })
            .then(this._checkResponse);
    }

    getInitialCards() {
        return fetch(`${this._urlBase}/cards`, {
            headers: this._headers,
            method: "GET"
        })
            .then(this._checkResponse);
    }

    editProfileInfo(name, about) {
        return fetch(`${this._urlBase}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(this._checkResponse);
    }

    addCard(name, link) {
        return fetch(`${this._urlBase}/cards`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(this._checkResponse);
    }
    deleteCard(id) {
        return fetch(`${this._urlBase}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    getCardLikeState(id) {
        return fetch(`${this._urlBase}/cards/${id}/likes`, {
            method: 'GET',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    setLikeStatus(id, isLiked) {
        if (isLiked) {
            return this.unlikeCard(id)
        }
        return this.likeCard(id)
    }

    likeCard(id) {
        return fetch(`${this._urlBase}/cards/${id}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(this._checkResponse);
    }

    unlikeCard(id) {
        return fetch(`${this._urlBase}/cards/${id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(this._checkResponse);
    }

    updateUserPic(avatarSrc) {
        return fetch(`${this._urlBase}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(
                {
                    avatar: avatarSrc
                }
            )
        })
            .then(this._checkResponse);
    }
}

const api = new Api(`https://api.hanneton.nomoreparties.co`, {
    "Content-type": "application/json",
    "Authorization": `Bearer: ${localStorage.getItem('jwt')}`
});

export default api;