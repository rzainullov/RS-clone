export class Lobby {
    constructor(settings) {
        this.language = settings[1].settingValue;
        this.color = settings[3].settingValue;
        this.currentPlayer = settings[4].settingValue[0];
        this.currentCombination = null;
        this.currentRound = 1;
    }
    

}