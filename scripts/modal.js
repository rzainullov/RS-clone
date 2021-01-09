/* eslint-disable linebreak-style */
import { languages } from "./language.js";
import { DB } from "../main.js";
import {initGame} from "./game/game.js";

export class Modal {
  constructor() {
    this.burger = document.querySelector("[data-burger]");
    this.burger.addEventListener("click", () => {
      const isModalActive = this.burger.classList.contains("active");
      if (isModalActive) {
        this.makeUnactive();
      } else {
        this.makeActive();
      }
    });
    this.modal = document.querySelector("[data-modal]");
  }

  makeActive() {
    this.burger.classList.add("active");
    this.modal.classList.add("active");
  }

  makeUnactive() {
    this.burger.classList.remove("active");
    this.modal.classList.remove("active");
  }

  getSettings(settings) {
    this.localSettings = settings || {
      playerName: "Player1",
      playerSettings: [
        { settingName: "playersCount", settingValue: "4" },
        { settingName: "playersNames", settingValue: ["Player1", "Player2", "Player3", "Player4"] },
        { settingName: "language", settingValue: "English" },
        { settingName: "sound", settingValue: "on" },
        { settingName: "color", settingValue: "red" }
      ]
    };
    return this;
  }

  setSettings() {
    DB.saveSettings(this.localSettings);
    return this;
  }

  logIn(login, passWord) {
    console.log(login);
    console.log(passWord);
    this.createMainModal();
  }

  getWords(typeOfModal) {
    const languageType = this.localSettings.playerSettings.find(el => el.settingName === "language").settingValue;
    this.wordsArr = languages.find(el => el.langName === languageType)[typeOfModal];
    return this;
  }

  createLogo() {
    const logo = document.createElement("div");
    logo.classList.add("modal__logo");
    this.modal.appendChild(logo);
    const logoImg = document.createElement("div");
    logoImg.classList.add("modal__img");
    logo.appendChild(logoImg);
    const logoText = document.createElement("div");
    logoText.innerText = this.wordsArr[0];
    logoText.classList.add("modal__text");
    logo.appendChild(logoText);
  }

  createWrap() {
    this.wrap = document.createElement("div");
    this.wrap.classList.add("modal__wrap");
    this.modal.appendChild(this.wrap);

    const wrapTitle = document.createElement("div");
    wrapTitle.innerText = this.wordsArr[1];
    wrapTitle.classList.add("modal__title");
    this.wrap.appendChild(wrapTitle);
  }

  createLoginModal() {
    this.modal.innerHTML = "";
    this.getWords("loginModal");
    this.createLogo();
    this.createWrap();

    const login = document.createElement("input");
    login.classList.add("modal__input");
    login.placeholder = this.wordsArr[2];
    this.wrap.appendChild(login);

    const passWord = document.createElement("input");
    passWord.classList.add("modal__input");
    passWord.placeholder = this.wordsArr[3];
    passWord.setAttribute("type", "password");
    this.wrap.appendChild(passWord);

    const enter = document.createElement("div");
    enter.innerText = this.wordsArr[4];
    enter.classList.add("modal__item");
    enter.addEventListener("click", () => {
      this.logIn(login.value, passWord.value);
    });
    this.wrap.appendChild(enter);

    const back = document.createElement("div");
    back.innerText = this.wordsArr[5];
    back.classList.add("modal__item");
    back.addEventListener("click", this.createMainModal.bind(this));
    this.wrap.appendChild(back);
  }

  createMainModal() {
    this.modal.innerHTML = "";
    this.getWords("mainModal");
    this.createLogo();
    this.createWrap();

    const wrapNewGame = document.createElement("div");
    wrapNewGame.innerText = this.wordsArr[2];
    wrapNewGame.classList.add("modal__item");
    wrapNewGame.addEventListener("click", this.newGame.bind(this));
    this.wrap.appendChild(wrapNewGame);

    const wrapSaveGame = document.createElement("div");
    wrapSaveGame.innerText = this.wordsArr[3];
    wrapSaveGame.classList.add("modal__item");
    wrapSaveGame.addEventListener("click", this.saveGame.bind(this));
    this.wrap.appendChild(wrapSaveGame);

    const wrapLoadGame = document.createElement("div");
    wrapLoadGame.innerText = this.wordsArr[4];
    wrapLoadGame.classList.add("modal__item");
    wrapLoadGame.addEventListener("click", this.loadGame.bind(this));
    this.wrap.appendChild(wrapLoadGame);

    const wrapSettings = document.createElement("div");
    wrapSettings.innerText = this.wordsArr[5];
    wrapSettings.classList.add("modal__item");
    wrapSettings.addEventListener("click", this.createSettingsModal.bind(this));
    this.wrap.appendChild(wrapSettings);

    const wrapLogin = document.createElement("div");
    wrapLogin.innerText = this.wordsArr[6];
    wrapLogin.classList.add("modal__item");
    wrapLogin.addEventListener("click", this.createLoginModal.bind(this));
    this.wrap.appendChild(wrapLogin);

    const wrapRules = document.createElement("div");
    wrapRules.innerText = this.wordsArr[7];
    wrapRules.classList.add("modal__item");
    wrapRules.addEventListener("click", this.createRulesModal.bind(this));
    this.wrap.appendChild(wrapRules);
    return this;
  }

  createSettingsModal() {
    this.modal.innerHTML = "";
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

    /** Save and back */
    const saveSettingsBtn = document.createElement("div");
    saveSettingsBtn.innerText = this.wordsArr[6];
    saveSettingsBtn.classList.add("modal__item");
    saveSettingsBtn.addEventListener("click", () => {
      this.setSettings();
      this.createSettingsModal();
    });
    this.wrap.appendChild(saveSettingsBtn);

    const backSettings = document.createElement("div");
    backSettings.innerText = this.wordsArr[7];
    backSettings.classList.add("modal__item");
    backSettings.addEventListener("click", () => {
      this.createMainModal();
    });
    this.wrap.appendChild(backSettings);
    return this;
  }

  createRulesModal() {
    this.modal.innerHTML = "";
    this.getWords("rulesModal");
    this.createLogo();
    this.createWrap();

    const wrapText = document.createElement("textarea");
    wrapText.value = this.wordsArr[2];
    wrapText.classList.add("modal-rules__textarea");
    this.wrap.appendChild(wrapText);

    const backSettings = document.createElement("div");
    backSettings.innerText = this.wordsArr[3];
    backSettings.classList.add("modal__item");
    backSettings.addEventListener("click", this.createMainModal.bind(this));
    this.wrap.appendChild(backSettings);
    return this;
  }

  newGame() {
    this.makeUnactive();
    initGame(this.localSettings.playerSettings);
    console.log("New game");
  }

  saveGame() {
    this.makeUnactive();
    console.log("Save game");
  }

  loadGame() {
    this.makeUnactive();
    console.log("Load game");
  }
}
