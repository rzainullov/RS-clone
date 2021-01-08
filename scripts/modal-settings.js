/* eslint-disable linebreak-style */
import { Modal } from "./modal.js";
import { ModalMain } from "./modal-main.js";
export class ModalSettings extends Modal {
  createSettingsModal() {
    this.clearModalArea();
    this.getWords("settingModal");
    this.createLogo();
    this.createWrap();

    const wrapPlayers = document.createElement("div");
    let playersCount = this.localSettings.playerSettings.find(el => el.settingName === "playersCount").settingValue;
    wrapPlayers.innerText = `${this.wordsArr[2]} ${playersCount}`;
    wrapPlayers.classList.add("modal__text-item");
    this.wrap.appendChild(wrapPlayers);

    const wrapNames = document.createElement("div");
    wrapNames.classList.add("modal__wrap-names");
    this.wrap.appendChild(wrapNames);
    const playersNames = this.localSettings.playerSettings.find(el => el.settingName === "playersNames").settingValue;
    const createAreaForNames = () => {
      wrapNames.innerHTML = "";
      const namesInput = [];
      for (let i = 0; i < +playersCount; i += 1) {
        namesInput[i] = document.createElement("textarea");
        namesInput[i].classList.add("modal__names");
        namesInput[i].value = playersNames[i];
        namesInput[i].addEventListener("blur", () => {
          playersNames[i] = namesInput[i].value;
        });
        wrapNames.appendChild(namesInput[i]);
      }
    };
    createAreaForNames();
    wrapPlayers.addEventListener("click", () => {
      playersCount = (playersCount % 4) + 1;
      wrapPlayers.innerText = `${this.wordsArr[2]} ${playersCount}`;
      this.localSettings.playerSettings.find(el => el.settingName === "playersCount").settingValue = playersCount;
      createAreaForNames();
    });

    const wrapLanguage = document.createElement("div");
    let languageType = this.localSettings.playerSettings.find(el => el.settingName === "language").settingValue;
    wrapLanguage.innerText = `${this.wordsArr[3]} ${languageType}`;
    wrapLanguage.classList.add("modal__text-item");
    wrapLanguage.addEventListener("click", () => {
      if (languageType === "English") {
        languageType = "Russian";
      } else if (languageType === "Russian") {
        languageType = "Italian";
      } else {
        languageType = "English";
      }
      wrapLanguage.innerText = `${this.wordsArr[3]} ${languageType}`;
      this.localSettings.playerSettings.find(el => el.settingName === "language").settingValue = languageType;
    });
    this.wrap.appendChild(wrapLanguage);

    const wrapSound = document.createElement("div");
    let soundType = this.localSettings.playerSettings.find(el => el.settingName === "sound").settingValue;
    wrapSound.innerText = `${this.wordsArr[4]} ${soundType}`;
    wrapSound.classList.add("modal__text-item");
    wrapSound.addEventListener("click", () => {
      soundType = soundType === "on" ? "off" : "on";
      wrapSound.innerText = `${this.wordsArr[4]} ${soundType}`;
      this.localSettings.playerSettings.find(el => el.settingName === "sound").settingValue = soundType;
    });
    this.wrap.appendChild(wrapSound);

    const wrapColor = document.createElement("div");
    let colorType = this.localSettings.playerSettings.find(el => el.settingName === "color").settingValue;
    wrapColor.innerText = `${this.wordsArr[5]} ${colorType}`;
    wrapColor.classList.add("modal__text-item");
    wrapColor.addEventListener("click", () => {
      colorType = colorType === "red" ? "green" : "red";
      wrapColor.innerText = `${this.wordsArr[5]} ${colorType}`;
      this.localSettings.playerSettings.find(el => el.settingName === "color").settingValue = colorType;
    });
    this.wrap.appendChild(wrapColor);

    const saveSettingsBtn = document.createElement("div");
    saveSettingsBtn.innerText = this.wordsArr[6];
    saveSettingsBtn.classList.add("modal__item");
    saveSettingsBtn.addEventListener("click", () => {
      this.setSettings();
      new ModalSettings().getSettings().createSettingsModal();
    });
    this.wrap.appendChild(saveSettingsBtn);

    const backSettings = document.createElement("div");
    backSettings.innerText = this.wordsArr[7];
    backSettings.classList.add("modal__item");
    backSettings.addEventListener("click", () => {
      new ModalMain().getSettings().createMainModal();
    });
    this.wrap.appendChild(backSettings);
    return this;
  }
}
