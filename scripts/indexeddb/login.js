/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import { defaultSettings } from "../default.js";
import { DB } from "../../main.js";

export async function hashPassword(password) {
  const msgBuffer = new TextEncoder("utf-8").encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ("00" + b.toString(16)).slice(-2)).join("");
  return hashHex;
}

function checkUserName(database, name) {
  let player = database.loadPlayer(name);
  player
    .then((data) => console.log(data))
    .catch((error) => console.log(new Error(error)));
  return player.data;
}

export class Login {
  constructor() {
    this.playerName = defaultSettings.playerName;
    this.setHashedPass("");
  }

  saveLogin(login, password) {
    this.setLogin(login);
    this.setPass(password);
    let player = {playerName: this.playerName, hashedPass: this.hashedPass};
    DB.savePlayer(player);
  }

  getLogin() {
    return this.playerName;
  }

  getHashedPass() {
    return this.hashedPass;
  }

  setLogin(name) {
    this.playerName = name;
  }

  setPass(password) {
    this.setHashedPass(password);
  }

  setHashedPass(password) {
    let hashPass = hashPassword(password);
    hashPass
      .then((data) => {
        this.hashedPass = data;
      })
      .catch(() => {
        this.hashedPass = "";
      });
  }
}
