export default class Api {

  constructor(options, loading) {
    this._cohort = options.cohort;
    this._key = options.key;
    this._loading = loading;
  }

  getUserInfo() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: `${this._key}`
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .then((result) => {
      return result;
    })
  };

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      headers: {
        authorization: `${this._key}`
      }
    })
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .then((result) => {
        return result.reverse();
      })
  };

  patchUserInfo(name, about) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        about: `${about}`
      })
    })
    .finally(() => {
      this._loading(false);
    });
  };

  postNewCard(name, link) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      method: 'POST',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `${name}`,
        link: `${link}`
      })
    })
    .finally(() => {
      this._loading(false);
    });
  };

  deleteCard(id) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      }
    });
  };

  putLike(id) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      }
    });
  };

  deleteLike(id) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      }
    });
  };

  patchAvatar(avatar) {
    fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${avatar}`
      })
    })
    .finally(() => {
      this._loading(false);
    });
  };
};