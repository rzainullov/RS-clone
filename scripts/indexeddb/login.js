/* eslint-disable linebreak-style */
import { defaultSettings } from "../default.js";

function hashPassword(pass) {
  return pass;
}

function checkUserName(name) {
  return true;
}

function checkPassword(pass) {
  return true;
}

export class Login {
  constructor(login, pass) {
    this.login = login;
    this.pass = hashPassword(pass);
    this.verifiedName = this.checkUserName(login);
  }

  checkUserName(name) {
    if (name === defaultSettings.playerName || name === null) {
      return true;
    }
    return false;
  }    
}
