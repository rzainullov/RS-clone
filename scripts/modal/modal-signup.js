/* eslint-disable linebreak-style */
import { modalTypesObject } from "../../main.js";
import { Modal } from "./modal.js";
import { ModalLogin } from "./modal-login.js";

export class ModalSignup extends Modal {
  constructor() {
    super();
  }

  pushSignup(isPasswordsEqual) {
    if (isPasswordsEqual) {
      /** Запись в БД */
      modalTypesObject.modalLogin = new ModalLogin()
        .loadSettings()
        .createModalLogin();
    } else {
      modalTypesObject.modalSignup = new ModalSignup()
        .loadSettings()
        .createModalSignup()
        .addErrorMessage();
    }
    return this;
  }

  pushBack() {
    modalTypesObject.modalLogin = new ModalLogin()
      .loadSettings()
      .createModalLogin();
    return this;
  }

  createModalSignup() {
    this.clearModalArea();
    this.getWords("signupModal");
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

    const repeatPassWord = document.createElement("input");
    repeatPassWord.classList.add("modal__input");
    repeatPassWord.placeholder = this.wordsArr[4];
    repeatPassWord.setAttribute("type", "password");
    this.wrap.appendChild(repeatPassWord);

    const signup = document.createElement("div");
    signup.innerText = this.wordsArr[5];
    signup.classList.add("modal__item");
    signup.addEventListener("click", () => {
      const isPasswordsEqual = passWord.value === repeatPassWord.value;
      this.pushSignup(isPasswordsEqual);
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
