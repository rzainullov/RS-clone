/* eslint-disable linebreak-style */
import { modalTypesObject } from "../../main.js";
import { Modal } from "./modal.js";
import { ModalSettings } from "./modal-settings.js";
import { ModalLogin } from "./modal-login.js";
import { ModalRules } from "./modal-rules.js";
import { initGame } from "../game/game.js";

export class ModalMain extends Modal {
  createModalMain() {
    this.clearModalArea();
    this.getWords("mainModal");
    this.createLogo();
    this.createWrap();

    const wrapNewGame = document.createElement("div");
    wrapNewGame.innerText = this.wordsArr[2];
    wrapNewGame.classList.add("modal__item");
    wrapNewGame.addEventListener("click", () => {
      this.newGame();
    });
    this.wrap.appendChild(wrapNewGame);

    const wrapSaveGame = document.createElement("div");
    wrapSaveGame.innerText = this.wordsArr[3];
    wrapSaveGame.classList.add("modal__item");
    wrapSaveGame.addEventListener("click", () => {
      this.saveGame();
    });
    this.wrap.appendChild(wrapSaveGame);

    const wrapLoadGame = document.createElement("div");
    wrapLoadGame.innerText = this.wordsArr[4];
    wrapLoadGame.classList.add("modal__item");
    wrapLoadGame.addEventListener("click", () => {
      this.loadGame();
    });
    this.wrap.appendChild(wrapLoadGame);

    const wrapSettings = document.createElement("div");
    wrapSettings.innerText = this.wordsArr[5];
    wrapSettings.classList.add("modal__item");
    wrapSettings.addEventListener("click", () => {
      modalTypesObject.modalSettings = new ModalSettings().loadSettings().createModalSettings();
    });
    this.wrap.appendChild(wrapSettings);

    const wrapLogin = document.createElement("div");
    wrapLogin.innerText = this.wordsArr[6];
    wrapLogin.classList.add("modal__item");
    wrapLogin.addEventListener("click", () => {
      modalTypesObject.modalLogin = new ModalLogin().loadSettings().createModalLogin();
    });
    this.wrap.appendChild(wrapLogin);

    const wrapRules = document.createElement("div");
    wrapRules.innerText = this.wordsArr[7];
    wrapRules.classList.add("modal__item");
    wrapRules.addEventListener("click", () => {
      modalTypesObject.modalRules = new ModalRules().loadSettings().createModalRules();
    });
    this.wrap.appendChild(wrapRules);
    return this;
  }

  newGame() {
    modalTypesObject.modal.makeUnactive();
    initGame(this.localSettings);
    return this;
  }

  saveGame() {
    modalTypesObject.modal.makeUnactive();
    return this;
  }

  loadGame() {
    modalTypesObject.modal.makeUnactive();
    return this;
  }
}
