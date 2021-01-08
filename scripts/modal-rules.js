/* eslint-disable linebreak-style */
import { Modal } from "./modal.js";
import { ModalMain } from "./modal-main.js";
export class ModalRules extends Modal {
  createRulesModal() {
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
      new ModalMain().getSettings().createMainModal();
    });
    this.wrap.appendChild(backSettings);
    return this;
  }
}
