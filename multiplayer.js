document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll('.cell');
  const turnDisplay = document.getElementById('turn');
  const messages = document.getElementById('messages');
  const xWinsDisplay = document.querySelector('.result p:nth-child(1)');
  const oWinsDisplay = document.querySelector('.result p:nth-child(2)');
  const playAgainButton = document.getElementById('playagain');
  const resetGameButton = document.getElementById('resetGame');
  
  let currentPlayer = 'X';
  let moves = 0;
  let xWins = 0;
  let oWins = 0;
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  
  function checkWinner() {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    for (let condition of winConditions) {
      const [a, b, c] = condition;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return gameBoard[a];
      }
    }
  
    return null;
  }
  
  function handleClick(cell, index) {
    if (cell.textContent === '' && !checkWinner()) {
      cell.textContent = currentPlayer;
      gameBoard[index] = currentPlayer;
      moves++;
  
      const winner = checkWinner();
  
      if (winner) {
        messages.textContent = `${winner} Wins!`;
        winner === 'X' ? xWins++ : oWins++;
        updateScores();
        playAgainButton.classList.remove('hide');
      } else if (moves === 9) {
        messages.textContent = "It's a Draw!";
        playAgainButton.classList.remove('hide');
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnDisplay.textContent = `${currentPlayer}'s Turn`;
      }
    }
  }
  
  function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    messages.textContent = '';
    currentPlayer = 'X';
    moves = 0;
    turnDisplay.textContent = `${currentPlayer}'s Turn`;
    playAgainButton.classList.add('hide');
  }
  
  function updateScores() {
    xWinsDisplay.textContent = `X's Wins: ${xWins}`;
    oWinsDisplay.textContent = `O's Wins: ${oWins}`;
  }
  
  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(cell, index));
  });
  
  playAgainButton.addEventListener('click', resetGame);
  resetGameButton.addEventListener('click', () => {
    xWins = 0;
    oWins = 0;
    updateScores();
    resetGame();
  });
  
  turnDisplay.textContent = `${currentPlayer}'s Turn`;
});
