/* eslint-disable linebreak-style */
export const languages = [
  {
    langName: "English",
    loginModal: ["Poker", "Login", "Login", "Password", "Sign in", "Sign up", "Back", "Wrong login or password"],
    mainModal: ["Poker", "Menu", "New game", "Save game", "Load game", "Settings", "Login", "Rules"],
    settingModal: ["Poker", "Settings", "Players:", "Language:", "Sound:", "Color:", "Apply", "Back"],
    rulesModal: ["Poker", "Rules", "The game can be played by one to four people. Players take turns. A player's turn consists of three dice rolls (Hotkey: 'Space'). After each throw, the player chooses which dice to keep and which to throw in order to improve his combination. At the end of the turn, the player writes down the collected combination in one of the remaining rows of the table. After twelve moves, the player with the most points wins.\n\nCombinations:\n\nOne: the sum of all collected ones. For example: 1-1-2-3-4 = 2. (Hotkey: '1')\n\nTwo: the sum of all collected twos. For example: 2-2-2-6-6 = 6. (Hotkey: '2')\n\nThree: the sum of all collected threes. For example: 3-3-1-2-4 = 6. (Hotkey: '3')\n\nFour: the sum of all collected fours. For example: 4-4-4-5-6 = 12. (Hotkey: '4')\n\nFive: the sum of all collected fives. For example: 5-5-1-2-3 = 10. (Hotkey: '5')\n\nSix: the sum of all collected sixes. For example: 6-6-6-1-2 = 18. (Hotkey: '6')\n\nAny: the sum of all dice, regardless of possible combinations. For example: 1-3-3-5-6 = 18. (Hotkey: '7')\n\nShort straight: four dice in order. The combination is worth 25 points. For example: 1-2-3-4-1. (Hotkey: '8')\n\nLong straight: five dice in order. The combination is worth 30 points. For example: 2-3-4-5-6. (Hotkey: '9')\n\nFull House: two dice of one rank and three dice of another rank. The result will be the sum of all dice. For example: 2-2-3-3-3 = 13. (Hotkey: '0')\n\nFour of a kind: four dice of the same rank. The result will be the sum of all dice. For example: 5-5-5-5-1 = 21. (Hotkey: '-')\n\nPoker: five dice of the same rank. The combination is worth 50 points. For example: 1-1-1-1-1. (Hotkey: '=')", "Back"],
    signupModal: ["Poker", "Sign up", "Login", "Password", "Repeat password", "Ok", "Back", "Passwords do not match"],
    gameArea: ["Scores sheet", "Close scores sheet"],
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
      fourOfKind: "Four of a kind",
      fullHouse: "Full house",
      smallStraight: "Small straight",
      longStraight: "Long straight",
      Total: "Total"
    },
    scoresSheet: ["Current round", "Current player", "Current attempt", "Scores sheet"]
  },
  {
    langName: "Russian",
    loginModal: ["Покер", "Вход", "Логин", "Пароль", "Войти", "Регистрация", "Назад", "Неверный логин или пароль"],
    mainModal: ["Покер", "Меню", "Новая игра", "Сохранить", "Загрузить", "Настройки", "Войти", "Правила"],
    settingModal: ["Покер", "Настройки", "Игроки:", "Язык:", "Звук:", "Цвет:", "Применить", "Вернуться"],
    rulesModal: ["Покер", "Правила", "В игре могут участвовать от одного до четырех человек. Игроки ходят по очереди. Ход игрока состоит из трех бросков костей (Горячая клавиша: 'Пробел'). После каждого броска игрок выбирает, какие кости оставить, а какие перебросить, что бы улучшить свою комбинацию. В конце хода игрок записывает собранную комбинацию в одну из оставшихся строчек таблицы. По истечении двенадцати ходов выигрывает игрок, набравший больше всего очков. \n\nКомбинации:\n\nЕдиницы: сумма всех собранных единиц. Например: 1-1-2-3-4 = 2. (Горячая клавиша: '1')\n\nДвойки: сумма всех собранных двоек. Например: 2-2-2-6-6 = 6. (Горячая клавиша: '2')\n\nТройки: Сумма всех собранных троек. Например: 3-3-1-2-4 = 6. (Горячая клавиша: '3')\n\nЧетверки: сумма всех собранных четверок. Например: 4-4-4-5-6 = 12. (Горячая клавиша: '4')\n\nПятерки: сумма всех собранных пятерок. Например: 5-5-1-2-3 = 10. (Горячая клавиша: '5')\n\nШестерки: сумма всех собранных шестерок. Например: 6-6-6-1-2 = 18. (Горячая клавиша: '6')\n\nЛюбая: сумма всех костей, независимо от комбинации. Например: 1-3-3-5-6 = 18. (Горячая клавиша: '7')\n\nКороткий стрит: четыре кости, расположенные по порядку. За комбинацию дается 25 очков. Например: 1-2-3-4-1. (Горячая клавиша: '8')\n\nДлинный стрит: пять костей, расположенных по порядку. За комбинацию дается 30 очков. Например: 2-3-4-5-6. (Горячая клавиша: '9')\n\nФул хауз: две кости одного номинала и три кости другого. Результатом будет сумма всех костей. Например: 2-2-3-3-3 = 13. (Горячая клавиша: '0')\n\nКаре: четыре кости одного номинала. Результатом будет сумма всех костей. Например: 5-5-5-5-1 = 21. (Горячая клавиша: '-')\n\nПокер: пять костей одного номинала. За комбинацию дается 50 очков. Например: 1-1-1-1-1. (Горячая клавиша: '=') ", "Вернуться"],
    signupModal: ["Покер", "Регистрация", "Логин", "Пароль", "Повторить пароль", "Ок", "Назад", "Пароли не совпадают"],
    gameArea: ["Лист результатов", "Закрыть лист результатов"],
    gameLobby: ["Текущая комбинация", "Бросить кости"],
    nameOfTableCells: {
      "player-name": "Имя игрока",
      one: "Единицы",
      two: "Двойки",
      three: "Тройки",
      four: "Четверки",
      five: "Пятерки",
      six: "Шестерки",
      sum: "Любая",
      poker: "Покер",
      fourOfKind: "Каре",
      fullHouse: "Фул хауз",
      smallStraight: "Короткий стрит",
      longStraight: "Длинный стрит",
      Total: "Всего"
    },
    scoresSheet: ["Текущий раунд", "Текущий игрок", "Текущая попытка", "Лист результатов"]
  },
  {
    langName: "Italian",
    loginModal: ["Poker", "Accesso", "Accesso", "Parol", "Entrare", "Sign up", "Indietro", "Nome utente o password errati"],
    mainModal: ["Poker", "Menu", "Nuova partita", "Salva", "Carica", "Impostazioni", "Accesso", "Regole"],
    settingModal: ["Poker", "Impostazioni", "Giocatori:", "Lingua:", "Suono:", "Colore:", "Applica", "Invio"],
    rulesModal: ["Poker", "Regole", "Il gioco può essere giocato da una a quattro persone. I giocatori si alternano. Il turno del giocatore consiste di tre dadi (Tasto di scelta rapida: 'spazio'). Dopo ogni lancio, il giocatore sceglie quali dadi tenere e quali rilanciare per migliorare Alla fine del turno, il giocatore annota la combinazione raccolta in una delle righe rimanenti della tabella. Dopo dodici mosse, vince il giocatore con il maggior numero di punti.\n\nCombinazioni:\n\nUnità: la somma di tutte le unità raccolte. Ad esempio: 1-1- 2-3-4 = 2. (Tasto di scelta rapida: '1')\n\nDoppia: la somma di tutti i due raccolti. Ad esempio: 2-2-2-6-6 = 6. (Tasto di scelta rapida: '2')\n\nTre: la somma di tutti i due raccolti. Ad esempio: 3-3-1- 2-4 = 6. (Tasto di scelta rapida: '3')\n\nQuarties: somma di tutti i quattro raccolti. Ad esempio: 4-4-4-5-6 = 12. (Tasto di scelta rapida: '4')\n\nFives: somma di tutti i cinque raccolti. Ad esempio: 5-5-1-2- 3 = 10. (Tasto di scelta rapida: '5')\n\nSixes: la somma di tutti i sei raccolti. Ad esempio: 6-6-6-1-2 = 18. (Tasto di scelta rapida: '6')\n\nAny: la somma di tutti i dadi, indipendentemente dalla combinazione. Ad esempio: 1-3-3-5 -6 = 18. (Tasto di scelta rapida: '7')\n\nCorta scala: quattro dadi in ordine. ci sono 25 punti. Ad esempio: 1-2-3-4-1. (Tasto di scelta rapida: '8')\n\nLong scala: cinque ossa in ordine. La combinazione vale 30 punti. Ad esempio: 2-3-4-5-6. (Tasto di scelta rapida: '9')\n\nCasa completa: due dadi di una denominazione e tre dadi dell'altra. Il risultato sarà la somma di tutte le ossa. Ad esempio: 2-2-3-3-3 = 13. (Tasto di scelta rapida: '0')\n\nKare: quattro dadi della stessa denominazione. Il risultato sarà la somma di tutte le ossa. Ad esempio: 5-5-5-5-1 = 21. (Tasto di scelta rapida: '-')\n\nPoker: cinque dadi della stessa denominazione. La combinazione vale 50 punti. Ad esempio: 1-1-1-1-1 (Tasto di scelta rapida: '=')", "Return"],
    signupModal: ["Poker", "Registrati", "Login", "Password", "Ripeti password", "On", "Indietro", "Le passwords non corrispondono"],
    gameArea: ["Foglio dei resultati", "Chiudere il foglio dei resultati"],
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
      longStraight: "Long scala",
      Total: "Total"
    },
    scoresSheet: ["Round in corso", "Giocatore attuale", "Tentativo attuale", "Foglio dei resultati"]
  }
];
