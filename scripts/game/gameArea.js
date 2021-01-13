/* eslint-disable linebreak-style */
import { gameLobby, initGameLobby } from "./gameLobby.js";
import { scoresSheet, initScoresSheet } from "./scoresSheet.js";
import { game } from "./game.js";
import { languages } from "../language.js";
import { modalTypesObject } from "../../main.js";

export var gameArea = null;

export class GameArea {
  constructor(settings, gameData) {
    this.main = document.querySelector("[data-main]");
    this.settings = settings;
    this.language = this.settings[2].settingValue;
    this.gameData = gameData;
    this.currentPlayerIndicator = null;
    this.currentRoundIndicator = null;
    this.currentAttemptIndicator = null;
    this.gameMenuButton = null;
    this.gameLobby = null;
    this.scoresSheet = null;
  }

  createIndicators() {
    const langIdx = languages.findIndex(item => item.langName === this.language);
    const currentRoundIndicator = document.createElement("p");
    currentRoundIndicator.setAttribute("data-current-round-indicator", "");
    currentRoundIndicator.textContent = `${languages[langIdx].gameArea[0]}:${this.gameData.playRound}`;
    this.currentRoundIndicator = currentRoundIndicator;
    const currentPlayerIndicator = document.createElement("p");
    currentPlayerIndicator.setAttribute("data-current-player-indicator", "");
    currentPlayerIndicator.textContent = `${languages[langIdx].gameArea[1]}:${this.gameData.currentPlayer}`;
    this.currentPlayerIndicator = currentPlayerIndicator;
    const currentAttemptIndicator = document.createElement("p");
    currentAttemptIndicator.setAttribute("data-current-attempt-indicator", "");
    currentAttemptIndicator.textContent = `${languages[langIdx].gameArea[2]}:${this.gameData.currentAttempt}`;
    this.currentAttemptIndicator = currentAttemptIndicator;
  }

  changeLanguageOfIndicators(language) {
    const langIdx = languages.findIndex(item => item.langName === language);
    const currentRoundIndicator = this.currentRoundIndicator;
    const currentPlayerIndicator = this.currentPlayerIndicator;
    const currentAttemptIndicator = this.currentAttemptIndicator;
    currentRoundIndicator.textContent = `${languages[langIdx].gameArea[0]}:${this.gameData.playRound}`;
    currentPlayerIndicator.textContent = `${languages[langIdx].gameArea[1]}:${this.gameData.currentPlayer}`;
    currentAttemptIndicator.textContent = `${languages[langIdx].gameArea[2]}:${this.gameData.currentAttempt}`;
  }

  addIndicators() {
    this.main.appendChild(this.currentRoundIndicator);
    this.main.appendChild(this.currentPlayerIndicator);
    this.main.appendChild(this.currentAttemptIndicator);
  }

  changeIndicator(indicator, text) {
    this.currentIndicator = document.querySelector(`[${indicator}]`);
    this.currentIndicator.textContent = text;
  }

  renderGameArea() {
    this.createIndicators();
    this.addIndicators();
    this.createGameLobby();
    this.addGameLobby();
    this.createScoresSheets();
    this.addScoresSheets();
    this.setEventListener();
  }

  createGameLobby() {
    initGameLobby(this.settings);
    this.gameLobby = gameLobby.renderGameLobby();
  }

  addGameLobby() {
    this.main.appendChild(this.gameLobby);
  }

  createScoresSheets() {
    initScoresSheet(game.currentGameData, this.settings);
    this.scoresSheet = scoresSheet.renderScoresSheet();
  }

  addScoresSheets() {
    this.main.appendChild(this.scoresSheet);
  }

  changeLanguageDuringGame() {
    this.language = modalTypesObject.modalSettings.localSettings.playerSettings[2].settingValue;
    game.language = this.language;
    gameLobby.language = this.language;
    scoresSheet.language = this.language;
    scoresSheet.changeColumnLanguage(this.language);
    gameLobby.changeLanguageOfDiceCellsSubscription(this.language);
    gameLobby.changeLanguageOfButton(this.language);
    this.changeLanguageOfIndicators(this.language);
    
  }

  setEventListener() {
    this.modal = document.querySelector("[data-modal]");
    this.modal.addEventListener("click", (e) => {
      if (e.target.textContent === "Applica" || e.target.textContent === "Apply" || e.target.textContent === "Применить") {
        this.changeLanguageDuringGame();
      }
    });
  }
}
export function initGameArea(settings, gameData) {
  gameArea = new GameArea(settings, gameData);
  gameArea.renderGameArea();
}
