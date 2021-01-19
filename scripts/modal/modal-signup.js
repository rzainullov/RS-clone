/* eslint-disable linebreak-style */
import { currentLogin, modalTypesObject } from "../../main.js";
import { Modal } from "./modal.js";
import { ModalLogin } from "./modal-login.js";

export class ModalSignup extends Modal {
  constructor() {
    super();
  }

  onSuccsessSignUp() {
    modalTypesObject.modalLogin = new ModalLogin()
      .getSettings()
      .createModalLogin();
    return this;
  }

  onErrorSignUp() {
    modalTypesObject.modalSignup = new ModalSignup()
      .getSettings()
      .createModalSignup()
      .addErrorMessage();
    return this;
  }

  pushSignup(password1, password2, login) {
    const isPasswordsEqual = password1 === password2;
    if (isPasswordsEqual) {
      currentLogin.saveLogin(login, password1, this.onErrorSignUp, this.onSuccsessSignUp);
    } else {
      this.onErrorSignUp();
    }
    return this;
  }

  pushBack() {
    modalTypesObject.modalLogin = new ModalLogin()
      .getSettings()
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
      this.checkPlaySound("A6");
      this.pushSignup(passWord.value, repeatPassWord.value, login.value);
    });
    this.wrap.appendChild(signup);

    const back = document.createElement("div");
    back.innerText = this.wordsArr[6];
    back.classList.add("modal__item");
    back.addEventListener("click", () => {
      this.checkPlaySound("A6");
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
