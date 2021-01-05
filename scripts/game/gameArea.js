import { Lobby } from "./gameLobby.js"

export class GameArea {
    constructor(settings,gameData) {
        this.main = document.querySelector('[data-main]');
        this.settings = settings;
        this.gameData = gameData;
        this.currentPlayerIndicator = null;
        this.currentRoundIndicator = null;
        this.gameMenuBtn = null;
    }
    createIndicators = () => {
        const currentRoundIndicator = document.createElement('p');
        currentRoundIndicator.setAttribute('data-current-round-indicator','');
        currentRoundIndicator.textContent = `Current round:${this.gameData[0].playRound}`;
        this.currentRoundIndicator = currentRoundIndicator;
        const currentPlayerIndicator = document.createElement('p');
        currentPlayerIndicator.setAttribute('data-current-player-indicator','');
        currentPlayerIndicator.textContent = `Current player:${this.gameData[0].currentPlayer}`;
        this.currentPlayerIndicator = currentPlayerIndicator;
        
    }
    addIndicators = () => {
        this.main.appendChild(this.currentRoundIndicator)
        this.main.appendChild(this.currentPlayerIndicator)  
    }
    createButtons = () => {
        
    }
    renderGameArea = (setting,gameData) => {
        this.createIndicators()
        this.addIndicators()
    }
    setGameLobby = (settings) => {
        
    }
}