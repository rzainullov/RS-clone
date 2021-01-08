/* eslint-disable linebreak-style */
import { Modal } from "./modal.js";
export class ModalMain extends Modal {
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