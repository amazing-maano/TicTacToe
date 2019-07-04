const game = new StartGame();
game.start();

function StartGame() {
  const board = new Board();
  const humanPlayer = new HumanPlayer(board);
  const computerPlayer = new ComputerPlayer(board);
  let turn = 0;

  this.start = function() {
    const config = { childList: true };
    const observer = new MutationObserver(() => userTurn());
    board.qId.forEach((el) => observer.observe(el, config));
    userTurn();
  }

  function userTurn() {
    if (board.checkForWinner()) {
      return;
    }
    if (turn % 2 === 0) {
      humanPlayer.userTurn();
    } else {
      computerPlayer.userTurn();
    }
    turn++;
  }
}

function Board() {
  this.qId = Array.from(document.getElementsByClassName('q'));
  this.checkForWinner = function() {
    let winner = false;
    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ];

    const qId = this.qId;
    winningCombos.forEach((winCombo) => {
      const qId0 = qId[winCombo[0]].innerText;
      const qId1 = qId[winCombo[1]].innerText;
      const qId2 = qId[winCombo[2]].innerText;
      const isWinningCombo = qId0 !== '' &&
      qId0 === qId1 && qId1 === qId2;
      if (isWinningCombo) {
          winner = true;
          winCombo.forEach((index) => {
            qId[index].className += ' winner';
          })
      }
    });

    return winner;
  }
}

function ComputerPlayer(board) {
  this.userTurn = function() {
    let quadPos = board.qId.filter((p) => p.innerText === '');
    const move = Math.floor(Math.random() * (quadPos.length - 0));
    quadPos[move].innerText = 'X';
  }
}

function HumanPlayer(board) {
  this.userTurn = function() {
    board.qId.forEach(el =>
      el.addEventListener('click', turnController));
  }

  function turnController(event) {
    event.target.innerText = 'O';
    board.qId
      .forEach(el => el.removeEventListener('click', turnController));
  }
}
