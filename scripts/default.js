/* eslint-disable linebreak-style */
export const defaultSettings = {
  playerName: "Player1",
  playerPass: "",
  playerSettings: [
    { settingName: "playersCount", settingValue: "4" },
    { settingName: "playersNames", settingValue: ["Player1", "Player2", "Player3", "Player4"] },
    { settingName: "language", settingValue: "English" },
    { settingName: "sound", settingValue: "on" },
    { settingName: "color", settingValue: "red" }
  ]
};

export const defaultGameSettings = {
  playerName: defaultSettings.playerName,
  playID: "1",
  playBeginDateTime: Date.now(),
  playRound: 1,
  playElapsedTime: null,
  currentPlayer: defaultSettings.playerName,
  currentAttempt: 0,
  currentCombination: ["", "", "", "", ""],
  currentDices: [],
  totalCombination: "",
  players: []
};

export const defaultPlayerData = {
  playerName: defaultSettings.playerName,
  playerCombos: {
    one: 0,
    two: 0,
    tree: 0,
    four: 0,
    five: 0,
    six: 0,
    sum: 0,
    smallStraight: 0,
    longStraight: 0,
    fullHouse: 0,
    fourOfKind: 0,
    poker: 0
  },
  playerTotal: 0
};
