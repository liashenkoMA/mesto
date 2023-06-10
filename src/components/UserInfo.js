export default class UserInfo {
  constructor(profileName, profileDescription, saveAvatar) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
  };

  getUserInfo() {
    return {
      popupName: this._profileName.textContent,
      popupDescription: this._profileDescription.textContent,
    };
  };

  setUserInfo(inputContent) {
    this._profileName.textContent = inputContent.name;
    this._profileDescription.textContent = inputContent.about;
  };
}