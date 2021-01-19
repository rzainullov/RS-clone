/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import { defaultSettings } from "../default.js";
import { DB } from "../../main.js";
// import { currentLogin } from "../../main.js";

export async function hashPassword(password) {
  const msgBuffer = new TextEncoder("utf-8").encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ("00" + b.toString(16)).slice(-2)).join("");
  return hashHex;
}

function makeAfterVerify(isVerified, verifiedCallback, unverifiedCallback) {
  if (isVerified) {
    verifiedCallback();
  } else {
    unverifiedCallback();
  }
}

function makeAfterSignUp(isPlayerExists, existsCallback, notexistsCallback) {
  if (isPlayerExists) {
    existsCallback();
  } else {
    notexistsCallback();
  }
}

export class Login {
  constructor() {
    this.playerName = defaultSettings.playerName;
    this.setHashedPass("");
  }

  saveLogin(login, password, existsCallback, notexistsCallback) {
    this.setLogin(login);
    this.setHashedPass(password, () => {
      const player = { playerName: this.playerName, hashedPass: this.hashedPass };
      let findPlayer = DB.loadPlayer(login);
      findPlayer
        .then((playerData) => {
          const isExists = playerData !== undefined;
          makeAfterSignUp(isExists, existsCallback, notexistsCallback);
          if (!isExists) {
            DB.savePlayer(player);
          }
        });
    });
  }

  checkPassword(login, password, verifiedCallback, unverifiedCallback) {
    this.setLogin(login);
    this.setHashedPass(password, () => {
      let findPlayer = DB.loadPlayer(login);
      findPlayer
        .then((playerData) => {
          const verify = playerData !== undefined
            && playerData.hashedPass === this.hashedPass;
          makeAfterVerify(verify, verifiedCallback, unverifiedCallback);
        });
    });
  }

  setLogin(name) {
    this.playerName = name;
  }

  setHashedPass(password, callback) {
    let hashPass = hashPassword(password);
    hashPass
      .then((data) => {
        this.hashedPass = data;
        callback();
      })
      .catch(() => {
        this.hashedPass = "";
        return "";
      });
  }
}
