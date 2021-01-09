import {initGameArea,gameArea} from './gameArea.js';
import {gameLobby} from './gameLobby.js'
import {scoresSheet} from './scoresSheet.js'


export var game = null;

export function initGame(settings,savedGame = null) {
    const main = document.querySelector('[data-main]');
    main.innerHTML = ''
    game = new Game(settings,savedGame);
    game.createNewGameArea();
}
export class Game {
    constructor(settings,savedGame = null){
       this.settings = settings;
       this.players = settings[1].settingValue;
       this.savedGameData = savedGame;
       this.currentGameData = null;
       this.lastEmptyRollDiceArea = [];
       this.templateGameData = {
        playerName:null,   
        playID: '1', //
        playBeginDateTime: Date.now(), //Кол-во мсек с 1 января 1970 года 00:00:00 по UTC
        playRound: 1,
        playElapsedTime: null,
        currentPlayer:this.players[0],
        currentAttempt: 0,
        currentCombination:['','','','',''],  
        currentDices:[],  
        totalCombination:null,
        players:[]
       }
       this.templatePlayerData = {
            playerName: null,
            playerCombos: {
                    one: null,
                    two: null, 
                    tree: null,
                    four: null,
                    five: null,
                    six: null,
                    sum: null,
                    smallStraight: null,
                    longStraight: null,
                    fullHouse: null,
                    fourOfKind: null,
                    poker: null,
            },
            playerTotal: null
        }     
    }
    createNewGameArea() {
        if(this.savedGameData === null){
            this.createNewGame();
            initGameArea(this.settings,this.currentGameData)
        } else {
            this.loadGame();
        }
    }
    createNewGame() {
        this.currentGameData = JSON.parse(JSON.stringify(this.templateGameData))
        this.players.forEach(player => {
            let currentPlayer = JSON.parse(JSON.stringify(this.templatePlayerData));
            currentPlayer.playerName = player;
            this.currentGameData.players.push(currentPlayer);
        }) 
    }
    
    loadGame() {

    }
    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    rollTheDices() {
        if(game.currentGameData.currentAttempt === 3 && this.currentCombinationIsChosen === false) {
            return null;
        }
        const dices = document.querySelector('[data-roll-dice-area]').childNodes;
        dices.forEach((dice,i) => {
            let randomNum = this.getRandomInt(1,7);
            if(dice.attributes[0].nodeValue === '' && this.currentGameData.currentAttempt !== 0 ){
                dice.setAttribute(`data-roll-dice-area-${i+1}`,``);
                dice.style.background = 'none';
            } else {
                dice.setAttribute(`data-roll-dice-area-${i+1}`,`${randomNum}`);
                dice.style.background = `url('/img/game/dice-${randomNum}.png') center / cover no-repeat `;
            }
            
        })
        if(this.findFirstFreeCellInDiceCells() !== (-1)) {
            this.initNextAttempt();
            this.getCurrentDices();
            this.getTotalCombination()
            scoresSheet.updateScoresSheet(this.currentGameData.totalCombination)
        }
       
        scoresSheet.putValuesInTable(this.currentGameData.currentPlayer)
       
        
    }
    clearRollDiceArea() {
        
        const dices = document.querySelector('[data-roll-dice-area]').childNodes;
        dices.forEach((dice,i) => {
            dice.setAttribute(`data-roll-dice-area-${i+1}`,``);
            dice.style.background = 'none';
        })
    }
    clearDiceCells() {
        const dices = document.querySelector('[data-dice-cells]').childNodes;
        dices.forEach((dice,i) => {
            dice.setAttribute(`data-dice-cell-${i+1}`,``);
            dice.style.background = 'none';
        })
    }
    initNextAttempt() {
        if(this.currentGameData.currentAttempt <= 3) {
            this.currentGameData.currentAttempt += 1;
        }  
        if(this.currentGameData.currentAttempt === 4) {

            
            if(this.currentGameData.currentPlayer === this.players[this.players.length - 1]) {
                this.changeCurrentRound()
                //Я присовил для this.currentGameData.currentPlayer несуществующий элемент массива this.players под индексом [-1]
                // для того что бы  при изменении имени текущего игрока в начале нового раунда [-1] переходила к существующему элементу 
                // c индексом 0(см.changeCurrentPlayer(), строка 2)
                this.currentGameData.currentPlayer = this.players[-1];
            }
            this.currentGameData.currentAttempt = 0;
            this.clearRollDiceArea();
            this.changeCurrentPlayer();
        }
        this.changeCurrentAttemptIndicator()
    }
    changeCurrentPlayer() {
        const currentIndexPlayer = this.currentGameData.players.findIndex(player => player.playerName === this.currentGameData.currentPlayer);
        this.currentGameData.currentPlayer = this.currentGameData.players[currentIndexPlayer + 1].playerName
        gameArea.changeIndicator('data-current-player-indicator',`Current player:${this.currentGameData.currentPlayer}`)
    }
    changeCurrentAttemptIndicator() {
        gameArea.changeIndicator('data-current-attempt-indicator',`Current attempt:${this.currentGameData.currentAttempt}`)
    }
    changeCurrentRound() {
        this.currentGameData.playRound += 1
        if(this.currentGameData.playRound === 13){
            this.finishGame()
        }
        gameArea.changeIndicator('data-current-round-indicator',`Current round:${this.currentGameData.playRound}`)
    }
    getCurrentDices() {
        const dices = document.querySelector('[data-roll-dice-area]').childNodes;
        this.currentGameData.currentDices = [];
        dices.forEach((dice,i) => {
            this.currentGameData.currentDices.push(dice.getAttribute(`data-roll-dice-area-${i+1}`));
        })
        this.currentGameData.currentDices.sort((a,b) => a - b);
    }
    getCurrentCombination() {
        const dices = document.querySelector('[data-dice-cells]').childNodes;
        this.currentGameData.currentCombination = [];
        dices.forEach((dice,i) => {
            this.currentGameData.currentCombination.push(dice.getAttribute(`data-dice-cell-${i+1}`));
        })
    }
    getTotalCombination() {
        const totalCombination = this.currentGameData.currentCombination.concat(this.currentGameData.currentDices)
        this.currentGameData.totalCombination = totalCombination.filter(dice => dice !== "")
    }
    

    moveDiceToDicesCells(target) {
        this.putChosenDiceInFreeDiceCell(target);
        this.removeOneDice(target)
      
    }
    moveDiceToRollDiceArea(target) {
        this.putChosenDiceInRollDiceArea(target);
        this.removeOneDice(target)
       
    }
    
    getDiceValueFromChosenDice(target) {
        const diceValue = target.attributes[0].nodeValue;
        return diceValue;
    }
    findFirstFreeCellInDiceCells() {
        const diceCells = gameLobby.diceCells;
        const diceCellsNodes = diceCells.childNodes;
        var diceCellsValues = [];
        diceCellsNodes.forEach((node) => {
            diceCellsValues.push(node);
        })
        return diceCellsValues.findIndex(item => item.attributes[0].nodeValue === '');
    }
    putChosenDiceInFreeDiceCell(target) {
        const freeCell = this.findFirstFreeCellInDiceCells();
        const value = this.getDiceValueFromChosenDice(target);
        const diceCells = gameLobby.diceCells;
        diceCells.childNodes[freeCell].setAttribute(`data-dice-cell-${freeCell + 1}`,`${value}`);
        diceCells.childNodes[freeCell].style.background = `url('/img/game/dice-${value}.png ') center / cover no-repeat `;
        this.getCurrentCombination();
    }
    putChosenDiceInRollDiceArea(target) {
        const freeCell = this.lastEmptyRollDiceArea.pop();
        const value = this.getDiceValueFromChosenDice(target);
        const rollDiceArea = document.querySelector(`[${freeCell}]`);
        rollDiceArea.attributes[0].nodeValue = value
        rollDiceArea.style.background = `url('/img/game/dice-${value}.png') center / cover no-repeat `;
        this.getCurrentCombination();
    }
    removeOneDice(target) {
        target.attributes[0].nodeValue = '';
        target.style.background = 'none';
        this.getCurrentDices();
        if(target.parentNode === document.querySelector('[data-roll-dice-area]')) {
            this.lastEmptyRollDiceArea.push(target.attributes[0].name);
        }
    }
    finishGame() {
            alert('Game was end')
            scoresSheet.getTotal();
    }
}
    
    
