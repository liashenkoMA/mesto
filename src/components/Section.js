export default class Section {

  constructor({renderer}, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  };

  renderItems(userInfo, items) {
    items.forEach((item) => {
      this._renderer(userInfo, item);
    });
  };

  addItem(cardElement) {
    this._container.prepend(cardElement);
  };

};