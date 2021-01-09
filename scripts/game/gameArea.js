import {gameLobby,initGameLobby} from "./gameLobby.js"
import {scoresSheet,initScoresSheet} from "./scoresSheet.js"
import {game} from "./game.js"

export var gameArea = null;

export function initGameArea(settings,gameData) {
    gameArea = new GameArea(settings,gameData);
    gameArea.renderGameArea();
}
export class GameArea {
    constructor(settings,gameData) {
        this.main = document.querySelector('[data-main]');
        this.settings = settings;
        this.gameData = gameData;
        this.currentPlayerIndicator = null;
        this.currentRoundIndicator = null;
        this.currentAttemptIndicator = null;
        this.gameMenuButton = null;
        this.gameLobby = null;
        this.scoresSheet = null;
    }
    createIndicators() {
        const currentRoundIndicator = document.createElement('p');
        currentRoundIndicator.setAttribute('data-current-round-indicator','');
        currentRoundIndicator.textContent = `Current round:${this.gameData.playRound}`;
        this.currentRoundIndicator = currentRoundIndicator;
        const currentPlayerIndicator = document.createElement('p');
        currentPlayerIndicator.setAttribute('data-current-player-indicator','');
        currentPlayerIndicator.textContent = `Current player:${this.gameData.currentPlayer}`;
        this.currentPlayerIndicator = currentPlayerIndicator;
        const currentAttemptIndicator = document.createElement('p');
        currentAttemptIndicator.setAttribute('data-current-attempt-indicator','');
        currentAttemptIndicator.textContent = `Current attempt:${this.gameData.currentAttempt}`;
        this.currentAttemptIndicator =  currentAttemptIndicator
    }
    addIndicators() {
        this.main.appendChild(this.currentRoundIndicator);
        this.main.appendChild(this.currentPlayerIndicator); 
        this.main.appendChild( this.currentAttemptIndicator); 
    }
    changeIndicator(indicator,text) {
        const currentIndicator = document.querySelector(`[${indicator}]`)
        currentIndicator.textContent = text;
    }
    renderGameArea(setting,gameData) {
        this.createIndicators();
        this.addIndicators();
        this.createGameLobby();
        this.addGameLobby();
        this.createScoresSheets();
        this.addScoresSheets()
        this.setEventListener();

    }
    createGameLobby() {
        initGameLobby(this.settings);
        this.gameLobby = gameLobby.renderGameLobby();
    }
    addGameLobby() {
        this.main.appendChild(this.gameLobby); 
    }
    createScoresSheets() {
        initScoresSheet(game.currentGameData,this.settings);
        this.scoresSheet = scoresSheet.renderScoresSheet();
    }
    addScoresSheets() {
        this.main.appendChild(this.scoresSheet); 
        
    }
    setEventListener() {
        const gameArea = this.main;
        gameArea.addEventListener('click',(e) => {
          
        })
    }
}