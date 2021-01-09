/* eslint-disable linebreak-style */
import { ModalLogin } from "./scripts/modal-login.js";
import { Modal } from "./scripts/modal.js";
export const modalTypesObject = {
  modal: {},
  modalLogin: {},
  modalMain: {},
  modalRules: {},
  modalSettings: {}
};
modalTypesObject.modal = new Modal().addBurgerPush();
modalTypesObject.modalLogin = new ModalLogin().getSettings().createModalLogin();
