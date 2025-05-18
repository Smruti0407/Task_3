const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill("");

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (gameState.every(cell => cell !== "")) {
    status.textContent = "It's a tie!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}

function resetGame() {
  gameState = Array(9).fill("");
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = "Player X's turn";
  document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
}

document.querySelectorAll('.cell').forEach(cell =>
  cell.addEventListener('click', handleCellClick)
);

resetBtn.addEventListener('click', resetGame);
