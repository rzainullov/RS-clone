/* eslint-disable linebreak-style */
import { modalTypesObject } from "../../main.js";
import { Modal } from "./modal.js";
import { ModalMain } from "./modal-main.js";
export class ModalRules extends Modal {
  createModalRules() {
    this.clearModalArea();
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
    backSettings.addEventListener("click", () => {
      this.checkPlaySound("A4");
      modalTypesObject.modalMain = new ModalMain().getSettings().createModalMain();
    });
    this.wrap.appendChild(backSettings);
    return this;
  }
}
