export class Modal {
  constructor () {
    this.modal = document.querySelector("[data-modal]");
    this.burger = document.querySelector("[data-burger]");
    this.burger.addEventListener("click", () => {
      if (this.isActive()) {
        this.makeUnactive();
      } else {
        this.makeActive();
      }
    });
  };
  isActive() {
    return this.burger.classList.contains("active") ? true : false;
  };
  makeActive() {
    this.burger.classList.add("active");
    this.modal.classList.add("active");
  };
  makeUnactive() {
    this.burger.classList.remove("active");
    this.modal.classList.remove("active");
  };
};