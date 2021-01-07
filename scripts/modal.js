/* eslint-disable linebreak-style */
import { Language } from "./language.js";
const languageObject = new Language();

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

  getSettings() {
    if (localStorage.getItem("settings") === null) {
      this.localSettings = [
        { settingName: "playersCount", settingValue: "4" },
        { settingName: "playersNames", settingValue: ["Player1", "Player2", "Player3", "Player4"] },
        { settingName: "language", settingValue: "English" },
        { settingName: "sound", settingValue: "on" },
        { settingName: "color", settingValue: "red" }
      ];
    } else {
      this.localSettings = JSON.parse(localStorage.getItem("settings"));
    }
    return this;
  }

  setSettings() {
    localStorage.setItem("settings", JSON.stringify(this.localSettings));
    return this;
  }

  isEnglish() {
    this.isEn = this.localSettings.find(el => el.settingName === "language").settingValue === "English";
    return this;
  }

  createMainModal() {
    this.modal.innerHTML = "";
    this.isEnglish();
    const wordsArr = this.isEn ? (
      languageObject.mainModalEnglish
    ) : (
      languageObject.mainModalRussia
    );

    /** Logo */
    const logo = document.createElement("div");
    logo.classList.add("modal__logo");
    this.modal.appendChild(logo);
    const logoImg = document.createElement("div");
    logoImg.classList.add("modal__img");
    logo.appendChild(logoImg);
    const logoText = document.createElement("div");
    logoText.innerText = wordsArr[0];
    logoText.classList.add("modal__text");
    logo.appendChild(logoText);

    /** Wrap */
    const wrap = document.createElement("div");
    wrap.classList.add("modal__wrap");
    this.modal.appendChild(wrap);

    const wrapTitle = document.createElement("div");
    wrapTitle.innerText = wordsArr[1];
    wrapTitle.classList.add("modal__title");
    wrap.appendChild(wrapTitle);

    const wrapNewGame = document.createElement("div");
    wrapNewGame.innerText = wordsArr[2];
    wrapNewGame.classList.add("modal__item");
    wrapNewGame.addEventListener("click", this.newGame.bind(this));
    wrap.appendChild(wrapNewGame);

    const wrapSaveGame = document.createElement("div");
    wrapSaveGame.innerText = wordsArr[3];
    wrapSaveGame.classList.add("modal__item");
    wrapSaveGame.addEventListener("click", this.saveGame.bind(this));
    wrap.appendChild(wrapSaveGame);

    const wrapLoadGame = document.createElement("div");
    wrapLoadGame.innerText = wordsArr[4];
    wrapLoadGame.classList.add("modal__item");
    wrapLoadGame.addEventListener("click", this.loadGame.bind(this));
    wrap.appendChild(wrapLoadGame);

    const wrapSettings = document.createElement("div");
    wrapSettings.innerText = wordsArr[5];
    wrapSettings.classList.add("modal__item");
    wrapSettings.addEventListener("click", this.createSettingsModal.bind(this));
    wrap.appendChild(wrapSettings);

    const wrapRules = document.createElement("div");
    wrapRules.innerText = wordsArr[6];
    wrapRules.classList.add("modal__item");
    wrapRules.addEventListener("click", this.createRulesModal.bind(this));
    wrap.appendChild(wrapRules);
    return this;
  }

  createSettingsModal() {
    this.modal.innerHTML = "";
    this.isEnglish();
    const wordsArr = this.isEn ? (
      languageObject.settingsModalEnglish
    ) : (
      languageObject.settingsModalRussia
    );

    /** Logo */
    const logo = document.createElement("div");
    logo.classList.add("modal__logo");
    this.modal.appendChild(logo);
    const logoImg = document.createElement("div");
    logoImg.classList.add("modal__img");
    logo.appendChild(logoImg);
    const logoText = document.createElement("div");
    logoText.innerText = wordsArr[0];
    logoText.classList.add("modal__text");
    logo.appendChild(logoText);

    /** Wrap */
    const wrap = document.createElement("div");
    wrap.style.cssText = "display: flex; flex-direction: column; align-items: center;  margin: 20px 0 0 0;";
    this.modal.appendChild(wrap);

    const wrapTitle = document.createElement("div");
    wrapTitle.innerText = wordsArr[1];
    wrapTitle.classList.add("modal__title");
    wrap.appendChild(wrapTitle);

    /** Settings */
    const wrapPlayers = document.createElement("div");
    let playersCount = this.localSettings.find(el => el.settingName === "playersCount").settingValue;
    wrapPlayers.innerText = `${wordsArr[2]} ${playersCount}`;
    wrapPlayers.classList.add("modal__text-item");
    wrap.appendChild(wrapPlayers);

    const wrapNames = document.createElement("div");
    wrapNames.classList.add("modal__wrap-names");
    wrap.appendChild(wrapNames);
    const playersNames = this.localSettings.find(el => el.settingName === "playersNames").settingValue;
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
      wrapPlayers.innerText = `${wordsArr[2]} ${playersCount}`;
      this.localSettings.find(el => el.settingName === "playersCount").settingValue = playersCount;
      createAreaForNames();
    });

    const wrapLanguage = document.createElement("div");
    let languageType = this.localSettings.find(el => el.settingName === "language").settingValue;
    wrapLanguage.innerText = `${wordsArr[3]} ${languageType}`;
    wrapLanguage.classList.add("modal__text-item");
    wrapLanguage.addEventListener("click", () => {
      languageType = languageType === "English" ? "Русский" : "English";
      wrapLanguage.innerText = `${wordsArr[3]} ${languageType}`;
      this.localSettings.find(el => el.settingName === "language").settingValue = languageType;
    });
    wrap.appendChild(wrapLanguage);

    const wrapSound = document.createElement("div");
    let soundType = this.localSettings.find(el => el.settingName === "sound").settingValue;
    wrapSound.innerText = `${wordsArr[4]} ${soundType}`;
    wrapSound.classList.add("modal__text-item");
    wrapSound.addEventListener("click", () => {
      soundType = soundType === "on" ? "off" : "on";
      wrapSound.innerText = `${wordsArr[4]} ${soundType}`;
      this.localSettings.find(el => el.settingName === "sound").settingValue = soundType;
    });
    wrap.appendChild(wrapSound);

    const wrapColor = document.createElement("div");
    let colorType = this.localSettings.find(el => el.settingName === "color").settingValue;
    wrapColor.innerText = `${wordsArr[5]} ${colorType}`;
    wrapColor.classList.add("modal__text-item");
    wrapColor.addEventListener("click", () => {
      colorType = colorType === "red" ? "green" : "red";
      wrapColor.innerText = `${wordsArr[5]} ${colorType}`;
      this.localSettings.find(el => el.settingName === "color").settingValue = colorType;
    });
    wrap.appendChild(wrapColor);

    /** Save and back */
    const saveSettingsBtn = document.createElement("div");
    saveSettingsBtn.innerText = wordsArr[6];
    saveSettingsBtn.classList.add("modal__item");
    saveSettingsBtn.addEventListener("click", () => {
      this.setSettings();
      this.getSettings();
      this.createSettingsModal();
    });
    wrap.appendChild(saveSettingsBtn);

    const backSettings = document.createElement("div");
    backSettings.innerText = wordsArr[7];
    backSettings.classList.add("modal__item");
    backSettings.addEventListener("click", () => {
      this.getSettings();
      this.createMainModal();
    });
    wrap.appendChild(backSettings);
    return this;
  }

  createRulesModal() {
    this.modal.innerHTML = "";
    const wordsArr = this.isEnglish() ? (
      languageObject.rulesModalEnglish
    ) : (
      languageObject.rulesModalRussia
    );

    /** Logo */
    const logo = document.createElement("div");
    logo.classList.add("modal__logo");
    this.modal.appendChild(logo);
    const logoImg = document.createElement("div");
    logoImg.classList.add("modal__img");
    logo.appendChild(logoImg);
    const logoText = document.createElement("div");
    logoText.innerText = wordsArr[0];
    logoText.classList.add("modal__text");
    logo.appendChild(logoText);

    /** Wrap */
    const wrap = document.createElement("div");
    wrap.style.cssText = "display: flex; flex-direction: column; align-items: center;  margin: 20px 0 0 0;";
    this.modal.appendChild(wrap);

    const wrapTitle = document.createElement("div");
    wrapTitle.innerText = wordsArr[1];
    wrapTitle.classList.add("modal__title");
    wrap.appendChild(wrapTitle);

    const wrapText = document.createElement("textarea");
    wrapText.value = wordsArr[2];
    wrapText.classList.add("modal-rules__textarea");
    wrap.appendChild(wrapText);

    const backSettings = document.createElement("div");
    backSettings.innerText = wordsArr[3];
    backSettings.classList.add("modal__item");
    backSettings.addEventListener("click", this.createMainModal.bind(this));
    wrap.appendChild(backSettings);
    return this;
  }

  newGame() {
    this.makeUnactive();
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
