/* eslint-disable linebreak-style */
import { modalTypesObject } from "../../main.js";
import { Modal } from "./modal.js";
import { ModalMain } from "./modal-main.js";
import { ModalSignup } from "./modal-signup.js";

export class ModalLogin extends Modal {
  constructor() {
    super();
  }

  onVerifiedLogin() {
    /** Подгрузка настроек в локал сторадж */
    modalTypesObject.modalMain = new ModalMain()
      .getSettings()
      .setSettings()
      .createModalMain();
    return this;
  }

  onUnverifiedLogin() {
    modalTypesObject.modalLogin = new ModalLogin()
      .loadSettings()
      .createModalLogin()
      .addErrorMessage();
    return this;
  }

  pushLogin(login, passWord) {
    /** Хешировать и завгрузить из базы данных */
    const isLoginPasswordCorrect = login === "user" && passWord === "pass";
    if (isLoginPasswordCorrect) {
      this.onVerifiedLogin();
    } else {
      this.onUnverifiedLogin();
    }
    return this;
  }

  pushSignup() {
    modalTypesObject.modalSignup = new ModalSignup().loadSettings().createModalSignup();
    return this;
  }

  pushBack() {
    modalTypesObject.modalMain = new ModalMain().loadSettings().createModalMain();
    return this;
  }

  createModalLogin() {
    this.clearModalArea();
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

    const signin = document.createElement("div");
    signin.innerText = this.wordsArr[4];
    signin.classList.add("modal__item");
    signin.addEventListener("click", () => {
      this.pushLogin(login.value, passWord.value);
    });
    this.wrap.appendChild(signin);

    const signup = document.createElement("div");
    signup.innerText = this.wordsArr[5];
    signup.classList.add("modal__item");
    signup.addEventListener("click", () => {
      this.pushSignup();
    });
    this.wrap.appendChild(signup);

    const back = document.createElement("div");
    back.innerText = this.wordsArr[6];
    back.classList.add("modal__item");
    back.addEventListener("click", () => {
      this.pushBack();
    });
    this.wrap.appendChild(back);
    return this;
  }

  addErrorMessage() {
    const err = document.createElement("div");
    err.innerText = this.wordsArr[7];
    err.classList.add("modal__error");
    this.wrap.prepend(err);
    return this;
  }
}
