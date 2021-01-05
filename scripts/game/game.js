import {GameArea} from './gameArea.js'

export class Game {
    constructor(settings,savedGame){
       this.settings = settings;
       this.players = ['Player1','Player2','Player3']
       this.savedGameData = null;
       this.currentGameData = [];
       this.templateGameData = {
        playID: '1', //
        playBeginDateTime: Date.now(), //Кол-во мсек с 1 января 1970 года 00:00:00 по UTC
        playRound: 1,
        playElapsedTime: null,
        currentPlayer:this.players[0],
        currentCombination:null,  
       }
       this.templatePlayerData = {
            playerName: null,
            playerCombos: {
                    setOne: null,
                    setTwo: null, 
                    setThree: null,
                    setFour: null,
                    setFive: null,
                    setSix: null,
                    setSum: null,
                    setSmallStraight: null,
                    setLongStraight: null,
                    setFullHouse: null,
                    setFourOfKind: null,
                    setPoker: null,
            },
            playerTotal: null
        }     
    }
    initGameArea = () => {
        if(this.savedGameData === null){
            this.createNewGame();
            const gameArea = new GameArea(this.settings,this.currentGameData);
            gameArea.renderGameArea();
        } else {
            this.loadGame();
            new GameArea.renderGameArea(this.settings,this.savedGameData);
        }
   
    }
    createNewGame = () => {
        this.currentGameData.push(this.templateGameData)
        this.players.forEach(player => {
            let currentPlayer =JSON.parse(JSON.stringify(this.templatePlayerData));
            currentPlayer.playerName = player;
            this.currentGameData.push(currentPlayer);
        }) 
    }
    
    loadGame = () => {

    }
}
    
    
