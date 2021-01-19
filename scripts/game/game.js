/* eslint-disable linebreak-style */
import { initGameArea } from "./gameArea.js";
import { gameLobby } from "./gameLobby.js";
import { scoresSheet } from "./scoresSheet.js";
import { languages } from "../language.js";
import { defaultGameSettings } from "../default.js";
import { defaultPlayerData } from "../default.js";

export var game = null;

export class Game {
  constructor(settings, savedGame = null) {
    this.settings = settings.playerSettings;
    this.players = this.settings[1].settingValue;
    this.language = this.settings[2].settingValue;
    this.langIdx = languages.findIndex(item => item.langName === this.language);
    this.master = settings.playerName;
    this.savedGameData = savedGame;
    this.currentGameData = null;
    this.lastEmptyRollDiceArea = [];
    this.templateGameData = defaultGameSettings;
    this.templatePlayerData = defaultPlayerData;
  }

  createNewGameArea() {
    if (this.savedGameData === null) {
      this.createNewGame();
      initGameArea(this.settings, this.currentGameData);
    } else {
      this.loadGame();
    }
  }

  createNewGame() {
    this.currentGameData = JSON.parse(JSON.stringify(this.templateGameData));
    this.players.forEach(player => {
      let currentPlayer = JSON.parse(JSON.stringify(this.templatePlayerData));
      currentPlayer.playerName = player;
      this.currentGameData.players.push(currentPlayer);
    });
  }

  //   loadGame() {

  //   }

  getRandomInt(min, max) {
    this.min = Math.ceil(min);
    this.max = Math.floor(max);
    return Math.floor(Math.random() * (this.max - this.min)) + min;
  }

  rollTheDices() {
    if (game.currentGameData.currentAttempt === 3 && this.currentCombinationIsChosen === false) {
      return null;
    }
    const dices = document.querySelector("[data-roll-dice-area]").childNodes;
    dices.forEach((item, i) => {
      let dice = item;
      let randomNum = this.getRandomInt(1, 7);
      if (dice.attributes[0].nodeValue === "" && this.currentGameData.currentAttempt !== 0) {
        dice.setAttribute(`data-roll-dice-area-${i + 1}`, "");
        dice.style.background = "none";
      } else {
        dice.setAttribute(`data-roll-dice-area-${i + 1}`, `${randomNum}`);
        dice.style.background = `url('img/game/dice-${randomNum}.png') center / cover no-repeat `;
      }
    });
    if (this.findFirstFreeCellInDiceCells() !== (-1)) {
      this.initNextAttempt();
      this.getCurrentDices();
      this.getTotalCombination();
      scoresSheet.updateScoresSheet(this.currentGameData.totalCombination);
    }
    scoresSheet.putValuesInTable(this.currentGameData.currentPlayer);
    return this;
  }

  clearRollDiceArea() {
    this.dices = document.querySelector("[data-roll-dice-area]").childNodes;
    this.dices.forEach((dice, i) => {
      this.dice = dice;
      this.dice.setAttribute(`data-roll-dice-area-${i + 1}`, "");
      this.dice.style.background = "none";
    });
  }

  clearDiceCells() {
    this.dices = document.querySelector("[data-dice-cells]").childNodes;
    this.dices.forEach((item, i) => {
      let dice = item;
      dice.setAttribute(`data-dice-cell-${i + 1}`, "");
      dice.style.background = "none";
    });
  }

  initNextAttempt() {
    if (this.currentGameData.currentAttempt <= 3) {
      this.currentGameData.currentAttempt += 1;
    }
    if (this.currentGameData.currentAttempt === 4) {
      if (this.currentGameData.currentPlayer === this.players[this.players.length - 1]) {
        this.changeCurrentRound();
        this.currentGameData.currentPlayer = this.players[-1];
      }
      this.currentGameData.currentAttempt = 0;
      this.clearRollDiceArea();
      this.changeCurrentPlayer();
    }
    this.changeCurrentAttemptIndicator();
  }

  changeCurrentPlayer() {
    const currentPlayer = this.currentGameData.currentPlayer;
    const players = this.currentGameData.players;
    const indexPlayer = players.findIndex(player => player.playerName === currentPlayer);
    this.currentGameData.currentPlayer = this.currentGameData.players[indexPlayer + 1].playerName;
    scoresSheet.markCurrentPlayer();
    scoresSheet.changeIndicator("data-current-player-indicator", `${languages[this.langIdx].scoresSheet[1]}:${this.currentGameData.currentPlayer}`);
  }

  changeCurrentAttemptIndicator() {
    scoresSheet.changeIndicator("data-current-attempt-indicator", `${languages[this.langIdx].scoresSheet[2]}:${this.currentGameData.currentAttempt}`);
  }

  changeCurrentRound() {
    this.currentGameData.playRound += 1;
    if (this.currentGameData.playRound === 13) {
      this.finishGame();
    }
    scoresSheet.changeIndicator("data-current-round-indicator", `${languages[this.langIdx].scoresSheet[0]}:${this.currentGameData.playRound}`);
  }

  getCurrentDices() {
    const dices = document.querySelector("[data-roll-dice-area]").childNodes;
    this.currentGameData.currentDices = [];
    dices.forEach((dice, i) => {
      this.currentGameData.currentDices.push(dice.getAttribute(`data-roll-dice-area-${i + 1}`));
    });
    this.currentGameData.currentDices.sort((a, b) => a - b);
  }

  getCurrentCombination() {
    const dices = document.querySelector("[data-dice-cells]").childNodes;
    this.currentGameData.currentCombination = [];
    dices.forEach((dice, i) => {
      this.currentGameData.currentCombination.push(dice.getAttribute(`data-dice-cell-${i + 1}`));
    });
  }

  getTotalCombination() {
    const currentCombination = this.currentGameData.currentCombination;
    const totalCombination = currentCombination.concat(this.currentGameData.currentDices);
    this.currentGameData.totalCombination = totalCombination.filter(dice => dice !== "");
  }

  moveDiceToDicesCells(target) {
    this.putChosenDiceInFreeDiceCell(target);
    this.removeOneDice(target);
  }

  moveDiceToRollDiceArea(target) {
    this.putChosenDiceInRollDiceArea(target);
    this.removeOneDice(target);
  }

  getDiceValueFromChosenDice(target) {
    this.diceValue = target.attributes[0].nodeValue;
    return this.diceValue;
  }

  findFirstFreeCellInDiceCells() {
    this.diceCells = gameLobby.diceCells;
    this.diceCellsNodes = this.diceCells.childNodes;
    this.diceCellsValues = [];
    this.diceCellsNodes.forEach((node) => {
      this.diceCellsValues.push(node);
    });
    return this.diceCellsValues.findIndex(item => item.attributes[0].nodeValue === "");
  }

  putChosenDiceInFreeDiceCell(target) {
    const freeCell = this.findFirstFreeCellInDiceCells();
    const value = this.getDiceValueFromChosenDice(target);
    const diceCells = gameLobby.diceCells;
    diceCells.childNodes[freeCell].setAttribute(`data-dice-cell-${freeCell + 1}`, `${value}`);
    diceCells.childNodes[freeCell].style.background = `url('img/game/dice-${value}.png ') center / cover no-repeat `;
    this.getCurrentCombination();
  }

  putChosenDiceInRollDiceArea(target) {
    const freeCell = this.lastEmptyRollDiceArea.pop();
    const value = this.getDiceValueFromChosenDice(target);
    const rollDiceArea = document.querySelector(`[${freeCell}]`);
    rollDiceArea.attributes[0].nodeValue = value;
    rollDiceArea.style.background = `url('img/game/dice-${value}.png') center / cover no-repeat `;
    this.getCurrentCombination();
  }

  removeOneDice(target) {
    this.target = target;
    this.target.attributes[0].nodeValue = "";
    this.target.style.background = "none";
    this.getCurrentDices();
    if (target.parentNode === document.querySelector("[data-roll-dice-area]")) {
      this.lastEmptyRollDiceArea.push(target.attributes[0].name);
    }
  }

  finishGame() {
    this.scoresSheet = scoresSheet;
    this.scoresSheet.getTotal();
  }
}

export function initGame(settings, savedGame = null) {
  const main = document.querySelector("[data-main]");
  main.innerHTML = "";
  game = new Game(settings, savedGame);
  game.createNewGameArea();
}
