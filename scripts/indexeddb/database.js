/* eslint-disable linebreak-style */
import * as dbFunctions from "./dbfunctions.js";
export class DataBase {
  constructor() {
    this.dataBaseDef = {
      name: dbFunctions.DB_NAME,
      version: 1,
      connection: null
    };

    this.playersTable = {
      name: dbFunctions.PLAYERS_TABLE,
      keyField: "playerName",
      store: null
    };

    this.settingsTable = {
      name: dbFunctions.SETTINGS_TABLE,
      keyField: "playerName",
      store: null
    };

    this.playsStore = {
      name: dbFunctions.PLAYS_TABLE,
      keyField: "playerName",
      store: null
    };

    if (dbFunctions.checkCapability()) {
      this.connectToDB();
    }
  }

  connectToDB() {
    dbFunctions.connectDB(this.dataBaseDef);
  }

  loadSettings(playerName) {
    return dbFunctions.loadData(this.dataBaseDef, this.settingsTable, playerName);
  }

  saveSettings(data) {
    dbFunctions.saveData(this.dataBaseDef, this.settingsTable, data);
  }

  saveGame(data) {
    dbFunctions.saveData(this.dataBaseDef, this.playsStore, data);
  }
}
