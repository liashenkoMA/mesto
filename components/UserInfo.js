export default class UserInfo {
  constructor(profileName, profileDescription) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);

    this._popupEditProfile = document.querySelector('.popup_type_edit-profile');
    this._popupNameAdd = this._popupEditProfile.querySelector('.popup__input_type_title');
    this._popupDescriptionAdd = this._popupEditProfile.querySelector('.popup__input_type_description');
  };

  getUserInfo() {
    return {
      popupName: this._profileName.textContent,
      popupDescription: this._profileDescription.textContent,
    };
  };

  setUserInfo() {
    this._profileName.textContent = this._popupNameAdd.value;
    this._profileDescription.textContent = this._popupDescriptionAdd.value;
  };
}