/* eslint-disable linebreak-style */
import { DataBase } from "./scripts/database.js";
import { Modal } from "./scripts/modal.js";

export let DB = new DataBase();
let loadSettings = DB.loadSettings("Player1");
loadSettings
  .then((data) => {
    new Modal().getSettings(data).setSettings().createLoginModal();
  });
