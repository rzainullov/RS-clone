/* eslint-disable linebreak-style */
import { Settings } from "./scripts/indexeddb/settings.js";
import { loadSettingsFromLocalStorage } from "./scripts/indexeddb/settings.js";
import { DataBase } from "./scripts/indexeddb/database.js";
import { Login } from "./scripts/indexeddb/login.js";
import { Modal } from "./scripts/modal/modal.js";
import { loadSettingsFromDB } from "./scripts/indexeddb/settings.js";
import { initModalLogin } from "./scripts/modal/modal-login.js";
import { Audio } from "./scripts/audio.js";

export let currentLogin = new Login();
export const globalSettings = new Settings(loadSettingsFromLocalStorage());
export let DB = new DataBase();
export const audioAPI = new Audio();
export const modalTypesObject = {
  modal: {},
  modalLogin: {},
  modalSignup: {},
  modalMain: {},
  modalRules: {},
  modalSettings: {}
};
modalTypesObject.modal = new Modal(globalSettings.getSettings()).addBurgerPush();
loadSettingsFromDB(initModalLogin);
