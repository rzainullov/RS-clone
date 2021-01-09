/* eslint linebreak-style: ["error", "windows"] */
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
    if (name === "Player1") {
      return true;
    }
    return false;
    }    
  }
}
