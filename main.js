/* eslint-disable linebreak-style */
import { DataBase } from "./scripts/database.js";
import { ModalLogin } from "./scripts/modal/modal-login.js";
import { Modal } from "./scripts/modal/modal.js";

export const modalTypesObject = {
  modal: {},
  modalLogin: {},
  modalMain: {},
  modalRules: {},
  modalSettings: {}
};
modalTypesObject.modal = new Modal().addBurgerPush();

export let DB = new DataBase();
let loadSettings = DB.loadSettings("Player1");
loadSettings
  .then((data) => {
    modalTypesObject.modalLogin = new ModalLogin()
      .getSettings(data)
      .setSettings()
      .createModalLogin();
  });
