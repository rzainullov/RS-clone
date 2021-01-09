import {game} from "./game.js"
export var gameLobby = null;
export function initGameLobby(settings) {
    gameLobby = new GameLobby(settings);
    gameLobby.renderGameLobby();
}


export class GameLobby {
    constructor(settings) {
        this.settings = settings;
        this.language = this.settings[2].settingValue;
        this.color = this.settings[4].settingValue;
        this.lobbyCloth = null;
        this.lobbyClothContainer = null;
        this.diceCellsSubscription = null;
        this.diceCells = null;
        this.rollDiceArea = null;
        this.rollButton = null;
        
    }
    renderGameLobby() {
        this.createLobbyCloth();
        this.createLobbyClothContainer();
        this.addLobbyClothContainer();
        this.createDiceCellsSubscriptions();
        this.addDiceCellsSubscriptions();
        this.createDiceCells();
        this.addDiceCells();
        this.createRollDiceArea()
        this.addRollDiceArea()
        this.createButtons();
        this.addButtons();
        this.setEventListener()
        return this.lobbyCloth

    }
    createLobbyCloth() {
        const lobbyCloth = document.createElement('div');
        lobbyCloth.setAttribute('data-lobby-cloth','');
        lobbyCloth.style.background = this.color
        this.lobbyCloth = lobbyCloth;
    }
    createLobbyClothContainer() {
        const lobbyClothContainer = document.createElement('div');
        lobbyClothContainer.setAttribute('data-lobby-cloth-container','');
        this.lobbyClothContainer = lobbyClothContainer;
    }
    addLobbyClothContainer() {
        this.lobbyCloth.appendChild(this.lobbyClothContainer);
    }
    createDiceCellsSubscriptions() {
        const diceCellsSubscription = document.createElement('p');
        diceCellsSubscription.setAttribute('data-dice-cells-subscription','');
        diceCellsSubscription.textContent = 'Current combination';
        this.diceCellsSubscription = diceCellsSubscription;
    }
    addDiceCellsSubscriptions() {
        this.lobbyClothContainer.appendChild(this.diceCellsSubscription);
    }
    createDiceCells() {
        const diceCells = document.createElement('div');
        diceCells.setAttribute('data-dice-cells','');
        diceCells.innerHTML = '<div data-dice-cell-1></div><div data-dice-cell-2></div><div data-dice-cell-3></div><div data-dice-cell-4></div><div data-dice-cell-5></div>';
        this.diceCells = diceCells;
    }
    addDiceCells() {
        this.lobbyClothContainer.appendChild(this.diceCells);
    }
    createRollDiceArea() {
        const rollDiceArea = document.createElement('div');
        rollDiceArea.setAttribute('data-roll-dice-area','');
        rollDiceArea.innerHTML = '<div data-roll-dice-area-1></div><div data-roll-dice-area-2></div><div data-roll-dice-area-3></div><div data-roll-dice-area-4></div><div data-roll-dice-area-5></div>';
        this.rollDiceArea = rollDiceArea;
    }
    addRollDiceArea() {
        this.lobbyClothContainer.appendChild(this.rollDiceArea);
    }
    createButtons() {
        const rollButton = document.createElement('div');
        rollButton.setAttribute('data-roll-btn','');
        rollButton.textContent = 'ROLL THE DICES';
        this.rollButton = rollButton;
    }
    addButtons() {
        this.lobbyClothContainer.appendChild(this.rollButton)
    }
    setEventListener() {
        const lobbyCloth = this.lobbyCloth;
        lobbyCloth.addEventListener('click',(e) => {
            if (e.target.textContent === 'ROLL THE DICES') {
                game.rollTheDices()
                game.currentCombinationIsChosen = false;
            } 
           
            if (e.target.parentNode === document.querySelector('[data-roll-dice-area]')) {
                game.moveDiceToDicesCells(e.target)
            }
            if (e.target.parentNode === document.querySelector('[data-dice-cells]')) {
                game.moveDiceToRollDiceArea(e.target)
            }

        })
    }
    

}
