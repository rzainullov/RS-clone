/* eslint-disable linebreak-style */
export const languages = [
  {
    langName: "English",
    loginModal: ["Poker", "Login", "Login", "Password", "Sign in", "Back", "Sign up"],
    mainModal: ["Poker", "Menu", "New game", "Save game", "Load game", "Settings", "Login", "Rules"],
    settingModal: ["Poker", "Settings", "Players:", "Language:", "Sound:", "Color:", "Apply", "Back"],
    rulesModal: ["Poker", "Rules", "The game can be played by one to four people. Players take turns. A player's turn consists of three dice rolls. After each throw, the player chooses which dice to keep and which to throw in order to improve his combination. At the end of the turn, the player writes down the collected combination in one of the remaining rows of the table. After twelve moves, the player with the most points wins.\n\nCombinations:\n\nOne: the sum of all collected ones. For example: 1-1-2-3-4 = 2.\n\nTwo: the sum of all collected twos. For example: 2-2-2-6-6 = 6.\n\nThree: the sum of all collected threes. For example: 3-3-1-2-4 = 6.\n\nFour: the sum of all collected fours. For example: 4-4-4-5-6 = 12.\n\nFive: the sum of all collected fives. For example: 5-5-1-2-3 = 10.\n\nSix: the sum of all collected sixes. For example: 6-6-6-1-2 = 18.\n\nAny: the sum of all dice, regardless of possible combinations. For example: 1-3-3-5-6 = 18.\n\nShort street: four dice in order. The combination is worth 25 points. For example: 1-2-3-4-1.\n\nLong Street: five dice in order. The combination is worth 30 points. For example: 2-3-4-5-6.\n\nFull House: two dice of one rank and three dice of another rank. The result will be the sum of all dice. For example: 2-2-3-3-3 = 13.\n\nFour of a kind: four dice of the same rank. The result will be the sum of all dice. For example: 5-5-5-5-1 = 21.\n\nPoker: five dice of the same rank. The combination is worth 50 points. For example: 1-1-1-1-1.", "Back"],
    gameArea: ["Current round", "Current player", "Current attempt"],
    gameLobby: ["Current combination", "Roll the dice"],
    nameOfTableCells: {
      "player-name": "Player name",
      one: "One",
      two: "Two",
      three: "Three",
      four: "Four",
      five: "Five",
      six: "Six",
      sum: "Any",
      poker: "Poker",
      fourOfKind: "Four Of a kind",
      fullHouse: "Full house",
      smallStraight: "Small street",
      longStraight: "Long street",
      Total: "Total"
    }
  },
  {
    langName: "Russian",
    loginModal: ["Покер", "Вход", "Логин", "Пароль", "Войти", "Назад", "Регистрация"],
    mainModal: ["Покер", "Меню", "Новая игра", "Сохранить", "Загрузить", "Настройки", "Войти", "Правила"],
    settingModal: ["Покер", "Настройки", "Игроки:", "Язык:", "Звук:", "Цвет:", "Применить", "Вернуться"],
    rulesModal: ["Покер", "Правила", "В игре могут участвовать от одного до четырех человек. Игроки ходят по очереди. Ход игрока состоит из трех бросков костей. После каждого броска игрок выбирает, какие кости оставить, а какие перебросить, что бы улучшить свою комбинацию. В конце хода игрок записывает собранную комбинацию в одну из оставшихся строчек таблицы. По истечении двенадцати ходов выигрывает игрок, набравший больше всего очков. \n\nКомбинации:\n\nЕдиницы: сумма всех собранных единиц. Например: 1-1-2-3-4 = 2.\n\nДвойки: сумма всех собранных двоек. Например: 2-2-2-6-6 = 6.\n\nТройки: Сумма всех собранных троек. Например: 3-3-1-2-4 = 6.\n\nЧетверки: сумма всех собранных четверок. Например: 4-4-4-5-6 = 12.\n\nПятерки: сумма всех собранных пятерок. Например: 5-5-1-2-3 = 10.\n\nШестерки: сумма всех собранных шестерок. Например: 6-6-6-1-2 = 18.\n\nЛюбая: сумма всех костей, независимо от комбинации. Например: 1-3-3-5-6 = 18.\n\nКороткий стрит: четыре кости, расположенные по порядку. За комбинацию дается 25 очков. Например: 1-2-3-4-1. \n\nДлинный стрит: пять костей, расположенных по порядку. За комбинацию дается 30 очков. Например: 2-3-4-5-6.\n\nФул хауз: две кости одного номинала и три кости другого. Результатом будет сумма всех костей. Например: 2-2-3-3-3 = 13.\n\nКаре: четыре кости одного номинала. Результатом будет сумма всех костей. Например: 5-5-5-5-1 = 21.\n\nПокер: пять костей одного номинала. За комбинацию дается 50 очков. Например: 1-1-1-1-1", "Вернуться"],
    gameArea: ["Текущий раунд", "Текущий игрок", "Текущая попытка"],
    gameLobby: ["Текущая комбинация", "Бросить кости"],
    nameOfTableCells: {
      "player-name": "Имя игрока",
      one: "Единицы",
      two: "Двойки",
      three: "Тройки",
      four: "Четверки",
      five: "Пятерки",
      six: "Шестреки",
      sum: "Любая",
      poker: "Покер",
      fourOfKind: "Каре",
      fullHouse: "Фул хауз",
      smallStraight: "Короткий стрит",
      longStraight: "Длинный стрит",
      Total: "Всего"
    }
  },
  {
    langName: "Italian",
    loginModal: ["Poker", "Accesso", "Accesso", "Parol", "Entrare", "Indietro", "Sign up"],
    mainModal: ["Poker", "Menu", "Nuova partita", "Salva", "Carica", "Impostazioni", "Accesso", "Regole"],
    settingModal: ["Poker", "Impostazioni", "Giocatori:", "Lingua:", "Suono:", "Colore:", "Applica", "Invio"],
    rulesModal: ["Poker", "Regole", "Il gioco può essere giocato da una a quattro persone. I giocatori si alternano. Il turno del giocatore consiste di tre dadi. Dopo ogni lancio, il giocatore sceglie quali dadi tenere e quali rilanciare per migliorare Alla fine del turno, il giocatore annota la combinazione raccolta in una delle righe rimanenti della tabella. Dopo dodici mosse, vince il giocatore con il maggior numero di punti.\n\nCombinazioni:\n\nUnità: la somma di tutte le unità raccolte. Ad esempio: 1-1- 2-3-4 = 2.\n\nDoppia: la somma di tutti i due raccolti. Ad esempio: 2-2-2-6-6 = 6.\n\nTre: la somma di tutti i due raccolti. Ad esempio: 3-3-1- 2-4 = 6.\n\nQuarties: somma di tutti i quattro raccolti. Ad esempio: 4-4-4-5-6 = 12.\n\nFives: somma di tutti i cinque raccolti. Ad esempio: 5-5-1-2- 3 = 10.\n\nSixes: la somma di tutti i sei raccolti. Ad esempio: 6-6-6-1-2 = 18.\n\nAny: la somma di tutti i dadi, indipendentemente dalla combinazione. Ad esempio: 1-3-3-5 -6 = 18.\n\nCorta scala: quattro dadi in ordine. ci sono 25 punti. Ad esempio: 1-2-3-4-1.\n\nLong Street: cinque ossa in ordine. La combinazione vale 30 punti. Ad esempio: 2-3-4-5-6.\n\nCasa completa: due dadi di una denominazione e tre dadi dell'altra. Il risultato sarà la somma di tutte le ossa. Ad esempio: 2-2-3-3-3 = 13.\n\nKare: quattro dadi della stessa denominazione. Il risultato sarà la somma di tutte le ossa. Ad esempio: 5-5-5-5-1 = 21.\n\nPoker: cinque dadi della stessa denominazione. La combinazione vale 50 punti. Ad esempio: 1-1-1-1-1 ", "Return"],
    gameArea: ["Round in corso", "Giocatore attuale", "Tentativo attuale"],
    gameLobby: ["Combinazione attuale", "Rotola i dadi"],
    nameOfTableCells: {
      "player-name": "Giocatoree",
      one: "Unita",
      two: "Doppia",
      three: "Tre",
      four: "Quarties",
      five: "Fives",
      six: "Sixes",
      sum: "Any",
      poker: "Poker",
      fourOfKind: "Kare",
      fullHouse: "FullHouse",
      smallStraight: "Corta scala",
      longStraight: "Long street",
      Total: "Total"
    }
  }
];
