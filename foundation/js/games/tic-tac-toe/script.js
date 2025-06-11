const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'Messi';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombos = [
  [0, 1, 2], 
  [3, 4, 5], 
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8],
  [2, 4, 6]  
];
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute('data-cell-index');
  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  checkResult();
}
function checkResult() {
  let roundWon = false;
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      roundWon = true;
      highlightWinningCells(combo);
      break;
    }
  }
  if (roundWon) {
    message.textContent = ` ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }
  if (!board.includes('')) {
    message.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }
  currentPlayer=(currentPlayer === 'Messi') ? 'Ronaldo' : 'Messi';
  message.textContent = ` ${currentPlayer}'s turn`;
}
function highlightWinningCells(combo) {
  combo.forEach(index => {
    const cell = document.querySelector(`.cell[data-cell-index="${index}"]`);
    cell.classList.add('winning-cell');
  });
}
function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'Messi';
  message.textContent = ` ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winning-cell');
  });
}
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);