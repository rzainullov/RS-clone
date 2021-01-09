import {game} from './game.js'
export var scoresSheet = null;
export function initScoresSheet(gameData,settings) {
    scoresSheet = new ScoresSheet(gameData,settings);
}
export class ScoresSheet {
    constructor(gameData,settings){
        this.main = document.querySelector('[data-main]')
        this.totalCombination = gameData.totalCombination;
        this.numberPlayer = settings[0].settingValue;
        this.players = gameData.players;
        this.currentPlayer = gameData.currentPlayer
        this.scoresSheetTable = null;
        this.mainColumn = null;
        this.playerColumns = null;
        this.combos = {
            one:0,
            two:0,
            three:0,
            four:0,
            five:0,
            six:0,
            sum:0,
            fourOfKind:0,
            fullHouse:0,
            poker:0,
            smallStraight:0,
            longStraight:0,
            sum:0,
        }
        this.howIsDefinedValues = [];
        this.nameOfTableCells = {
            'player-name':'Player name',
            'one':'One',
            'two':'Two',
            'three':'Three',
            'four':'Four',
            'five':'Five',
            'six':'Six',
            'sum':'Sum',
            'poker':'Poker',
            'fourOfKind':'FourOfKind',
            'fullHouse':'FullHouse',
            'smallStraight':'SmallStraight',
            'longStraight':'LongStraight',
            'Total':'Total'
        }
        
    }
    updateScoresSheet(totalCombination) {
        this.updateTotalCombination(totalCombination);
        this.getSumsOfDices();
        this.getSum();
        this.getPoker();
        this.getFourOfKind();
        this.getFullHouse();
        this.getSmallStraight();
        this.getLongStraight();
        
        
    }
    updateTotalCombination(totalCombination) {
        this.totalCombination = totalCombination;
    }
    getSumsOfDices(){
        if(this.totalCombination !== null) {
            this.combos.one = this.totalCombination.filter(digit => digit === '1').length;
            this.howIsDefinedValues[1] = this.combos.one
            this.combos.one = this.howIsDefinedValues[1] * 1
            this.combos.two = this.totalCombination.filter(digit => digit === '2').length;
            this.howIsDefinedValues[2] = this.combos.two
            this.combos.two = this.howIsDefinedValues[2] * 2
            this.combos.three = this.totalCombination.filter(digit => digit === '3').length;
            this.howIsDefinedValues[3] = this.combos.three
            this.combos.three = this.howIsDefinedValues[3] * 3
            this.combos.four = this.totalCombination.filter(digit => digit === '4').length;
            this.howIsDefinedValues[4] = this.combos.four
            this.combos.four= this.howIsDefinedValues[4] * 4
            this.combos.five = this.totalCombination.filter(digit => digit === '5').length;
            this.howIsDefinedValues[5] = this.combos.five
            this.combos.five = this.howIsDefinedValues[5] * 5
            this.combos.six = this.totalCombination.filter(digit => digit === '6').length;
            this.howIsDefinedValues[6] = this.combos.six
            this.combos.six = this.howIsDefinedValues[6] * 6
        }
    }
    getPoker() {
        const oneFive = this.howIsDefinedValues.filter(digit => digit === 5).length
         if(oneFive === 1) {
            this.combos.poker = 50;
        }
    }
    getFourOfKind() {
        const oneFour = this.howIsDefinedValues.filter(digit => digit === 4).length
         if(oneFour === 1) {
            this.combos.fourOfKind = this.combos.sum
        }
   }
    getFullHouse() {
        const oneTwo = this.howIsDefinedValues.filter(digit => digit === 2).length === 1
        const oneThree = this.howIsDefinedValues.filter(digit => digit === 3).length === 1
        if(oneTwo && oneThree) {
            this.combos.fullHouse = this.combos.sum
        }
    }
    getSmallStraight() {
        if(this.howIsDefinedValues[1] > 0 && this.howIsDefinedValues[2] > 0 && this.howIsDefinedValues[3] > 0 && this.howIsDefinedValues[4] > 0){
            this.combos.smallStraight = 25
        }
        if(this.howIsDefinedValues[2] > 0 && this.howIsDefinedValues[3] > 0 && this.howIsDefinedValues[4] > 0 && this.howIsDefinedValues[5] > 0){
            this.combos.smallStraight = 25
        } if(this.howIsDefinedValues[3] > 0 && this.howIsDefinedValues[4] > 0 && this.howIsDefinedValues[5] > 0 && this.howIsDefinedValues[6] > 0){
            this.combos.smallStraight = 25
        }
   }
   getLongStraight() {
        const moreFiveOne = this.howIsDefinedValues.filter(digit => digit === 1).length >= 5
        if(moreFiveOne && this.howIsDefinedValues[3] === 1 && this.howIsDefinedValues[4] === 1 && this.howIsDefinedValues[2] === 1 && this.howIsDefinedValues[5] === 1){
            this.combos.longStraight = 30
        }
    }
    getSum() {
        this.combos.sum = this.howIsDefinedValues.reduce((acc,digit,i) => acc + (digit * i));
    }
    getTotal() {
        const playerColumns = document.querySelector(`[data-player-columns`).childNodes;
        const totalsArr = [];
        playerColumns.forEach((column) => {
            var accumulator = 0
            column.childNodes.forEach(value => {
                if(value.dataset.playerProp !== 'player-name' && value.dataset.playerProp !== 'Total') {
                    accumulator += parseFloat(value.textContent)
                }  
            })
            totalsArr.push(accumulator)
        })
        const totals = document.querySelectorAll(`[data-player-prop ='Total'`)
        totals.forEach((total,i) => total.textContent = totalsArr[i])
    
        
    }
    renderScoresSheet() {
        this.createScoresSheetTable();
        this.createMainColumn();
        this.addMainColumn();
        this.createPlayerColumns();
        this.addPlayerColumns();
        this.setEventListener();
        return this.scoresSheetTable;
    }
    createScoresSheetTable() {
        const scoresSheetsTable = document.createElement('div'); 
        scoresSheetsTable.setAttribute('data-ss-table','');
        this.scoresSheetTable = scoresSheetsTable;
    }
    createMainColumn() {
        const mainColumn = document.createElement('div');
        mainColumn.setAttribute('data-ss-table-mc','');
        for(let prop in this.nameOfTableCells){
            const cell = document.createElement('div');
            cell.setAttribute(`data-ss-table-mc-${prop}`,'');
            cell.textContent = this.nameOfTableCells[prop];
            cell.style.border = '1px solid black'
            mainColumn.appendChild(cell);
        }
        this.mainColumn = mainColumn;
    }
    addMainColumn() {
        this.scoresSheetTable.appendChild(this.mainColumn);
    }
    createPlayerColumns() {
        const playerColumns = document.createElement('div');
        playerColumns.setAttribute('data-player-columns','');
        playerColumns.style.gridTemplateColumns = `repeat(${this.numberPlayer},1fr)`;
        this.players.forEach(player => {
            const playerColumn = document.createElement('div');
            playerColumn.setAttribute('data-player-column',`${player.playerName}`);
            for(let prop in this.nameOfTableCells){
                const cell = document.createElement('div');
                cell.setAttribute('data-player-prop',`${prop}`);
                if(this.nameOfTableCells[prop] !== 'Player name' && this.nameOfTableCells[prop] !== 'Total' ){
                        cell.textContent = 0;
                } else {
                    if(this.nameOfTableCells[prop] === 'Player name') {
                        cell.textContent = player.playerName;
                    } 
                    if(this.nameOfTableCells[prop] === 'Total') {
                        cell.textContent = player.playerTotal;
                        cell.textContent = '';
                    } 
                
                }
                cell.style.border = '1px solid black';
                playerColumn.appendChild(cell);
            }
            playerColumns.appendChild(playerColumn);
        })
        this.playerColumns = playerColumns;
        
    }
    addPlayerColumns() {
        this.scoresSheetTable.appendChild(this.playerColumns);
    }
    putValuesInTable(currentPlayer) {
        const currentColumn = document.querySelector(`[data-player-column = '${currentPlayer}']`).childNodes;
        currentColumn.forEach((cell) => {
            if(cell.dataset.playerProp !== 'player-name' && cell.dataset.playerProp !== 'Total' && !cell.classList.contains('accepted') ) {
                cell.textContent = this.combos[`${cell.dataset.playerProp}`];
            }
        })
    }
    acceptCombination(target) {
        if(target.attributes[0].name === 'data-player-prop' && !target.classList.contains('accepted')) {
            const parent = target.parentNode.childNodes;
            target.classList.add('accepted');
            parent.forEach(child => {
                if(child.dataset.playerProp !== 'player-name' && child.dataset.playerProp !== 'Total'){
                    child.classList.contains('accepted') ? null : child.textContent = 0;
                    
                } 
            })
            for(let combo in this.combos){
                this.combos[combo] = "0";
            }
            game.currentGameData.currentAttempt = 4;
            game.initNextAttempt();
            game.clearRollDiceArea();
            game.clearDiceCells();
            game.currentGameData.currentCombination = [];

        }
    }
    setEventListener() {
        this.scoresSheetTable.addEventListener('click',(e) => {
            this.acceptCombination(e.target);
        })
    }
} 