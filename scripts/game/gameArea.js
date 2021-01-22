/* eslint-disable linebreak-style */
import { gameLobby, initGameLobby } from "./gameLobby.js";
import { scoresSheet, initScoresSheet } from "./scoresSheet.js";
import { game } from "./game.js";
import { languages } from "../language.js";
import { modalTypesObject } from "../../main.js";
import { audioAPI } from "../../main.js";

export var gameArea = null;

export class GameArea {
  constructor(settings, gameData) {
    this.main = document.querySelector("[data-main]");
    this.mainContainer = null;
    this.settings = settings;
    this.language = this.settings[2].settingValue;
    this.langIdx = languages.findIndex(item => item.langName === this.language);
    this.gameData = gameData;
    this.gameLobby = null;
    this.scoresSheet = null;
    this.scoresSheetButton = null;
  }

  createMainContainer() {
    const mainContainer = document.createElement("div");
    mainContainer.setAttribute("data-main-container", "");
    this.mainContainer = mainContainer;
  }

  addMainContainer() {
    this.main.appendChild(this.mainContainer);
  }

  renderGameArea() {
    this.createMainContainer();
    this.createGameLobby();
    this.addGameLobby();
    this.createScoresSheets();
    this.addScoresSheets();
    this.addMainContainer();
    this.createButtons();
    this.addButtons();
    this.setEventListener();
  }

  createGameLobby() {
    initGameLobby(this.settings);
    this.gameLobby = gameLobby.renderGameLobby();
  }

  addGameLobby() {
    this.mainContainer.appendChild(this.gameLobby);
  }

  createScoresSheets() {
    initScoresSheet(game.currentGameData, this.settings);
    this.scoresSheet = scoresSheet.renderScoresSheet();
  }

  addScoresSheets() {
    this.mainContainer.appendChild(this.scoresSheet);
  }

  createButtons() {
    const scoresSheetButton = document.createElement("div");
    scoresSheetButton.setAttribute("data-ss-btn", "");
    scoresSheetButton.textContent = `${languages[this.langIdx].gameArea[0]}`;
    this.scoresSheetButton = scoresSheetButton;
  }

  changeLanguageOfButton() {
    const scoresSheetButton = this.scoresSheetButton;
    scoresSheetButton.textContent = `${languages[this.langIdx].gameArea[0]}`;
  }

  addButtons() {
    this.main.appendChild(this.scoresSheetButton);
  }

  openScoresSheet(langIdx) {
    this.sheet = scoresSheet.emptySheet;
    this.sheet.classList.add("open");
    this.scoresSheetButton.textContent = `${languages[langIdx].gameArea[1]}`;
  }

  closeScoresSheet(langIdx) {
    this.sheet = scoresSheet.emptySheet;
    this.sheet.classList.remove("open");
    this.scoresSheetButton.textContent = `${languages[langIdx].gameArea[0]}`;
  }

  changeLanguageDuringGame() {
    this.language = modalTypesObject.modalSettings.localSettings.playerSettings[2].settingValue;
    this.langIdx = languages.findIndex(item => item.langName === this.language);
    game.langIdx = this.langIdx;
    gameLobby.langIdx = this.langIdx;
    scoresSheet.langIdx = this.langIdx;
    game.language = this.language;
    gameLobby.language = this.language;
    scoresSheet.language = this.language;
    this.changeLanguageOfButton();
    scoresSheet.changeColumnLanguage(this.language);
    gameLobby.changeLanguageOfDiceCellsSubscription();
    gameLobby.changeLanguageOfButton();
    scoresSheet.changeLanguageOfIndicators(this.language);
    scoresSheet.changeLanguageOfHeading(this.language);
  }

  checkPlaySound(note) {
    const isAudioOn = this.settings[3].settingValue === "on";
    if (isAudioOn) {
      audioAPI.playNote(note);
    }
  }

  setEventListener() {
    this.modal = document.querySelector("[data-modal]");
    this.modal.addEventListener("click", (e) => {
      if (e.target.textContent === "Applica" || e.target.textContent === "Apply" || e.target.textContent === "Применить") {
        this.changeLanguageDuringGame();
      }
    });
    this.scoresSheetButton.addEventListener("click", (e) => {
      this.checkPlaySound("A3");
      if (e.target.textContent === `${languages[this.langIdx].gameArea[0]}`) {
        this.openScoresSheet(this.langIdx);
      } else {
        this.closeScoresSheet(this.langIdx);
      }
    });
  }
}
export function initGameArea(settings, gameData) {
  gameArea = new GameArea(settings, gameData);
  gameArea.renderGameArea();
}
