/* eslint-disable linebreak-style */
import { defaultSettings } from "../default.js";
import { DB } from "../../main.js";
import { currentLogin } from "../../main.js";
import { globalSettings } from "../../main.js";

export function loadSettingsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("settings")) || defaultSettings;
}

export function loadSettingsFromDB(callback) {
  let loadSettings = DB.loadSettings(currentLogin.playerName);
  loadSettings
    .then((loadedSettings) => {
      globalSettings.setSettings(loadedSettings);
      callback(globalSettings.getSettings(), true);
    })
    .catch(() => {
      callback(loadSettingsFromLocalStorage(), true);
    });
}

export class Settings {
  #settings = defaultSettings;
  constructor(settings) {
    this.#settings = settings || defaultSettings;
  }

  setSettings(settings) {
    this.#settings = settings || defaultSettings;
  }

  getSettings() {
    return this.#settings;
  }
}
