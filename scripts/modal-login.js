/* eslint-disable linebreak-style */
import { Modal } from "./modal.js";
import { ModalMain } from "./modal-main.js";
export class ModalLogin extends Modal {
  constructor() {
    super();
  }

  onNewLogin() {
    console.log("Create new user");
    /** Добавление пользователя и пароля в БД */
    new ModalMain()
      .deleteSettings()
      .getSettings()
      .setSettings()
      .createMainModal();
    return this;
  }

  onVerifiedLogin() {
    console.log("login successfully");
    /** Подгрузка настроек в локал сторадж */
    new ModalMain().getSettings().setSettings().createMainModal();
    return this;
  }

  onUnveifiedLogin() {
    console.log("login failed");
    new ModalLogin().getSettings().createLoginModal();
    return this;
  }

  pushLogin(login, passWord) {
    const haveUser = true;
    const isPasswordCorrect = true;
    if (haveUser) {
      if (isPasswordCorrect) {
        this.onVerifiedLogin();
      } else {
        this.onUnveifiedLogin();
      }
    } else {
      this.onNewLogin();
    }
    return this;
  }

  pushBack() {
    new ModalMain().getSettings().setSettings().createMainModal();
    return this;
  }

  createLoginModal() {
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

    const enter = document.createElement("div");
    enter.innerText = this.wordsArr[4];
    enter.classList.add("modal__item");
    enter.addEventListener("click", () => {
      this.pushLogin(login.value, passWord.value);
    });
    this.wrap.appendChild(enter);

    const back = document.createElement("div");
    back.innerText = this.wordsArr[5];
    back.classList.add("modal__item");
    back.addEventListener("click", this.pushBack);
    this.wrap.appendChild(back);
  }
}
