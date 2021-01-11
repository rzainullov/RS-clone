/* eslint-disable linebreak-style */

import { game } from "./game.js";
export var scoresSheet = null;
export class ScoresSheet {
  constructor(gameData, settings) {
    this.main = document.querySelector("[data-main]");
    this.totalCombination = gameData.totalCombination;
    this.numberPlayer = settings[0].settingValue;
    this.players = gameData.players;
    this.currentPlayer = gameData.currentPlayer;
    this.scoresSheetTable = null;
    this.mainColumn = null;
    this.playerColumns = null;
    this.combos = {
      one: 0,
      two: 0,
      three: 0,
      four: 0,
      five: 0,
      six: 0,
      sum: 0,
      fourOfKind: 0,
      fullHouse: 0,
      poker: 0,
      smallStraight: 0,
      longStraight: 0
    };
    this.values = [];
    this.nameOfTableCells = {
      "player-name": "Player name",
      one: "One",
      two: "Two",
      three: "Three",
      four: "Four",
      five: "Five",
      six: "Six",
      sum: "Sum",
      poker: "Poker",
      fourOfKind: "FourOfKind",
      fullHouse: "FullHouse",
      smallStraight: "SmallStraight",
      longStraight: "LongStraight",
      Total: "Total"
    };
  }

  updateScoresSheet(totalCombination) {
    this.updateTotalCombination(totalCombination);
    this.getSumsOfDices();
    this.getSum();
    this.getPoker();
    this.getFourOfKind();
    this.getFullHouse();
    this.getSmallStraight();
    this.getLongStraight();
  }

  updateTotalCombination(totalCombination) {
    this.totalCombination = totalCombination;
  }

  getSumsOfDices() {
    if (this.totalCombination !== null) {
      this.combos.one = this.totalCombination.filter(digit => digit === "1").length;
      this.values[1] = this.combos.one;
      this.combos.one = this.values[1] * 1;
      this.combos.two = this.totalCombination.filter(digit => digit === "2").length;
      this.values[2] = this.combos.two;
      this.combos.two = this.values[2] * 2;
      this.combos.three = this.totalCombination.filter(digit => digit === "3").length;
      this.values[3] = this.combos.three;
      this.combos.three = this.values[3] * 3;
      this.combos.four = this.totalCombination.filter(digit => digit === "4").length;
      this.values[4] = this.combos.four;
      this.combos.four = this.values[4] * 4;
      this.combos.five = this.totalCombination.filter(digit => digit === "5").length;
      this.values[5] = this.combos.five;
      this.combos.five = this.values[5] * 5;
      this.combos.six = this.totalCombination.filter(digit => digit === "6").length;
      this.values[6] = this.combos.six;
      this.combos.six = this.values[6] * 6;
    }
  }

  getPoker() {
    const oneFive = this.values.filter(digit => digit === 5).length;
    if (oneFive === 1) {
      this.combos.poker = 50;
    }
  }

  getFourOfKind() {
    const oneFour = this.values.filter(digit => digit === 4).length;
    if (oneFour === 1) {
      this.combos.fourOfKind = this.combos.sum;
    }
  }

  getFullHouse() {
    const oneTwo = this.values.filter(digit => digit === 2).length === 1;
    const oneThree = this.values.filter(digit => digit === 3).length === 1;
    if (oneTwo && oneThree) {
      this.combos.fullHouse = this.combos.sum;
    }
  }

  getSmallStraight() {
    if (this.values[1] > 0 && this.values[2] > 0 && this.values[3] > 0 && this.values[4] > 0) {
      this.combos.smallStraight = 25;
    }
    if (this.values[2] > 0 && this.values[3] > 0 && this.values[4] > 0 && this.values[5] > 0) {
      this.combos.smallStraight = 25;
    } if (this.values[3] > 0 && this.values[4] > 0 && this.values[5] > 0 && this.values[6] > 0) {
      this.combos.smallStraight = 25;
    }
  }

  getLongStraight() {
    const ones = this.values.filter(digit => digit === 1).length >= 5;
    if (ones && this.values[3] === 1 && this.values[4] === 1) {
      if (this.values[2] === 1 && this.values[5] === 1) {
        this.combos.longStraight = 30;
      }
    }
  }

  getSum() {
    this.combos.sum = this.values.reduce((acc, digit, i) => acc + (digit * i));
  }

  getTotal() {
    this.playerColumns = document.querySelector("[data-player-columns").childNodes;
    this.totalsArr = [];
    this.playerColumns.forEach((column) => {
      var accumulator = 0;
      column.childNodes.forEach(value => {
        if (value.dataset.playerProp !== "player-name" && value.dataset.playerProp !== "Total") {
          accumulator += parseFloat(value.textContent);
        }
      });
      this.totalsArr.push(accumulator);
    });
    const totals = document.querySelectorAll("[data-player-prop ='Total'");
    totals.forEach((item, i) => {
      const total = item;
      total.textContent = this.totalsArr[i];
      return this;
    });
  }

  renderScoresSheet() {
    this.createScoresSheetTable();
    this.createMainColumn();
    this.addMainColumn();
    this.createPlayerColumns();
    this.addPlayerColumns();
    this.setEventListener();
    return this.scoresSheetTable;
  }

  createScoresSheetTable() {
    const scoresSheetsTable = document.createElement("div");
    scoresSheetsTable.setAttribute("data-ss-table", "");
    this.scoresSheetTable = scoresSheetsTable;
  }

  createMainColumn() {
    const mainColumn = document.createElement("div");
    mainColumn.setAttribute("data-ss-table-mc", "");
    const props = Object.keys(this.nameOfTableCells);
    const propsText = Object.values(this.nameOfTableCells);
    props.forEach((item, idx) => {
      const cell = document.createElement("div");
      cell.setAttribute(`data-ss-table-mc-${item}`, "");
      cell.textContent = propsText[idx];
      cell.style.border = "1px solid black";
      mainColumn.appendChild(cell);
    });
    this.mainColumn = mainColumn;
  }

  addMainColumn() {
    this.scoresSheetTable.appendChild(this.mainColumn);
  }

  createPlayerColumns() {
    const playerColumns = document.createElement("div");
    playerColumns.setAttribute("data-player-columns", "");
    playerColumns.style.gridTemplateColumns = `repeat(${this.numberPlayer},1fr)`;
    this.players.forEach(player => {
      const playerColumn = document.createElement("div");
      playerColumn.setAttribute("data-player-column", `${player.playerName}`);
      const props = Object.keys(this.nameOfTableCells);
      const propsText = Object.keys(this.nameOfTableCells);
      props.forEach((item, idx) => {
        const cell = document.createElement("div");
        cell.setAttribute("data-player-prop", `${item}`);
        if (propsText[idx] !== "player-name" && propsText[idx] !== "Total") {
          cell.textContent = 0;
        } else {
          if (propsText[idx] === "player-name") {
            cell.textContent = player.playerName;
          }
          if (propsText[idx] === "Total") {
            cell.textContent = player.playerTotal;
            cell.textContent = "";
          }
        }
        cell.style.border = "1px solid black";
        playerColumn.appendChild(cell);
      });
      playerColumns.appendChild(playerColumn);
    });
    this.playerColumns = playerColumns;
  }

  addPlayerColumns() {
    this.scoresSheetTable.appendChild(this.playerColumns);
  }

  putValuesInTable(currentPlayer) {
    const currentColumn = document.querySelector(`[data-player-column = '${currentPlayer}']`).childNodes;
    currentColumn.forEach((item) => {
      const cell = item;
      if (cell.dataset.playerProp !== "player-name" && cell.dataset.playerProp !== "Total" && !cell.classList.contains("accepted")) {
        cell.textContent = this.combos[`${cell.dataset.playerProp}`];
      }
    });
  }

  acceptCombination(target) {
    if (target.attributes[0].name === "data-player-prop" && !target.classList.contains("accepted")) {
      const parent = target.parentNode.childNodes;
      target.classList.add("accepted");
      parent.forEach(item => {
        const child = item;
        if (child.dataset.playerProp !== "player-name" && child.dataset.playerProp !== "Total") {
          if (!child.classList.contains("accepted")) {
            child.textContent = 0;
          }
        }
      });
      const combos = Object.keys(this.combos);
      combos.forEach((item) => {
        this.combos[item] = "0";
      });
      game.currentGameData.currentAttempt = 4;
      game.initNextAttempt();
      game.clearRollDiceArea();
      game.clearDiceCells();
      game.currentGameData.currentCombination = [];
    }
  }

  setEventListener() {
    this.scoresSheetTable.addEventListener("click", (e) => {
      this.acceptCombination(e.target);
    });
  }
}
export function initScoresSheet(gameData, settings) {
  scoresSheet = new ScoresSheet(gameData, settings);
}
