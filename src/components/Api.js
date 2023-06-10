export default class Api {

  constructor(options) {
    this._cohort = options.cohort;
    this._key = options.key;
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
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me`, {
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  postNewCard(name, link) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
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
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  deleteCard(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  putLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  deleteLike(id) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };

  patchAvatar(avatar) {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `${this._key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: `${avatar}`
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };
};