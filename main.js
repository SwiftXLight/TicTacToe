const cells = Array.from(document.querySelectorAll('.cell'));
const resetBtn = document.querySelector('.reset');
const showWinner = document.querySelector('.show-winner');
const displayPlayer = document.querySelector('.display-player');

let board = ['', '', '', '', '', '', '', '', '',];
let curPlayer = 'x';
let isGameActive = true;

const xPlayerWon = 'O player won';
const oPlayerWon = 'X player won';
const draw = 'draw';

const winCombs = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6]
];

function handleResultValidation() {
   let roundWon = false;
   for (let i = 0; i <= 7; i++) {
      const winCondition = winCombs[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === '' || b === '' || c === '') {
         continue;
      }
      if (a === b && b === c) {
         roundWon = true;
         break;
      }
   }

   if (roundWon) {
      announce(curPlayer === 'x' ? xPlayerWon : oPlayerWon);
      isGameActive = false;
      return;
   }

   if (!board.includes('')) announce(draw);
}

const announce = (type) => {
   switch (type) {
      case oPlayerWon:
         showWinner.innerHTML = 'Player <span class="player-o">o</span> Won';
         break;
      case xPlayerWon:
         showWinner.innerHTML = 'Player <span class="player-x">x</span> Won';
         break;
      case draw:
         showWinner.innerText = 'draw';
   }
   showWinner.classList.remove('hide');
};

const isValidAction = (cell) => {
   if (cell.innerText === 'x' || cell.innerText === 'o') {
      return false;
   }

   return true;
};

const updateBoard = (i) => {
   board[i] = curPlayer;
}

const changePlayer = () => {
   displayPlayer.classList.remove(`player-${curPlayer}`);
   curPlayer = curPlayer === 'x' ? 'o' : 'x';
   displayPlayer.innerText = curPlayer;
   displayPlayer.classList.add(`player-${curPlayer}`);
}

const userAction = (cell, i) => {
   if (isValidAction(cell) && isGameActive) {
      cell.innerText = curPlayer;
      cell.classList.add(`player-${curPlayer}`);
      updateBoard(i);
      handleResultValidation();
      changePlayer();
   }
};

const resetBoard = () => {
   board = ['', '', '', '', '', '', '', '', ''];
   isGameActive = true;
   showWinner.classList.add('hide');

   cells.forEach(cell => {
      cell.innerText = '';
      cell.classList.remove('player-x');
      cell.classList.remove('player-o');
   });
}

cells.forEach((cell, i) => {
   cell.addEventListener('click', () => userAction(cell, i));
});

resetBtn.addEventListener('click', resetBoard);