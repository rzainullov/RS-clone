/* eslint-disable linebreak-style */
import { DataBase } from "./scripts/indexeddb/database.js";
import { ModalLogin } from "./scripts/modal/modal-login.js";
import { Modal } from "./scripts/modal/modal.js";
import { defaultSettings } from "./scripts/default.js";
import { Login } from "./scripts/indexeddb/login.js";

export const modalTypesObject = {
  modal: {},
  modalLogin: {},
  modalMain: {},
  modalRules: {},
  modalSettings: {}
};
modalTypesObject.modal = new Modal().addBurgerPush();

export let DB = new DataBase();
export let currentLogin = new Login();
let loadSettings = DB.loadSettings(defaultSettings.playerName);
loadSettings
  .then((data) => {
    modalTypesObject.modalLogin = new ModalLogin()
      .getSettings(data)
      .setSettings()
      .createModalLogin();
  });
