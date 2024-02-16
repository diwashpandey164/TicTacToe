document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll('.cell');
  const turnDisplay = document.getElementById('turn');
  const messages = document.getElementById('messages');
  const yourWinsDisplay = document.querySelector('.result p:nth-child(1)');
  const computerWinsDisplay = document.querySelector('.result p:nth-child(2)');
  const playAgainButton = document.getElementById('playagain');
  const resetGameButton = document.getElementById('resetGame');
  
  let currentPlayer = 'X';
  let moves = 0;
  let yourWins = 0;
  let computerWins = 0;
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameFinished = false;

  function checkWinner(board) {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  function handleClick(cell, index) {
    if (!gameFinished && cell.textContent === '') {
      cell.textContent = 'X';
      gameBoard[index] = 'X';
      moves++;

      const winner = checkWinner(gameBoard);

      if (winner) {
        messages.textContent = winner === 'X' ? 'You win!' : 'Computer wins!';
        winner === 'X' ? yourWins++ : computerWins++;
        updateScores();
        gameFinished = true;
        playAgainButton.classList.remove('hide');
      } else if (moves === 9) {
        messages.textContent = "It's a Draw!";
        gameFinished = true;
        playAgainButton.classList.remove('hide');
      } else {
        turnDisplay.textContent = "Computer's Turn";
        setTimeout(computerMove, 2000); // Delay computer's move by 2 seconds
      }
    }
  }

  function computerMove() {
    // Implement more sophisticated AI for computer's move
    // Here, let's prioritize blocking the player's winning moves, then choosing a winning move if available, otherwise choose a random available cell
    const winningMoves = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // Check if the computer can win in the next move
    for (let move of winningMoves) {
      const [a, b, c] = move;
      if (gameBoard[a] === 'O' && gameBoard[b] === 'O' && gameBoard[c] === '') {
        cells[c].textContent = 'O';
        gameBoard[c] = 'O';
        moves++;
        checkGameResult();
        return;
      } else if (gameBoard[a] === 'O' && gameBoard[c] === 'O' && gameBoard[b] === '') {
        cells[b].textContent = 'O';
        gameBoard[b] = 'O';
        moves++;
        checkGameResult();
        return;
      } else if (gameBoard[b] === 'O' && gameBoard[c] === 'O' && gameBoard[a] === '') {
        cells[a].textContent = 'O';
        gameBoard[a] = 'O';
        moves++;
        checkGameResult();
        return;
      }
    }

    // Check if the player can win in the next move and block it
    for (let move of winningMoves) {
      const [a, b, c] = move;
      if (gameBoard[a] === 'X' && gameBoard[b] === 'X' && gameBoard[c] === '') {
        cells[c].textContent = 'O';
        gameBoard[c] = 'O';
        moves++;
        checkGameResult();
        return;
      } else if (gameBoard[a] === 'X' && gameBoard[c] === 'X' && gameBoard[b] === '') {
        cells[b].textContent = 'O';
        gameBoard[b] = 'O';
        moves++;
        checkGameResult();
        return;
      } else if (gameBoard[b] === 'X' && gameBoard[c] === 'X' && gameBoard[a] === '') {
        cells[a].textContent = 'O';
        gameBoard[a] = 'O';
        moves++;
        checkGameResult();
        return;
      }
    }

    // If no winning or blocking move is possible, choose a random available cell
    const availableCells = [];
    cells.forEach((cell, index) => {
      if (cell.textContent === '') {
        availableCells.push(index);
      }
    });
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const computerChoice = availableCells[randomIndex];
    cells[computerChoice].textContent = 'O';
    gameBoard[computerChoice] = 'O';
    moves++;
    checkGameResult();
  }

  function checkGameResult() {
    const winner = checkWinner(gameBoard);

    if (winner) {
      messages.textContent = winner === 'X' ? 'You win!' : 'Computer wins!';
      winner === 'X' ? yourWins++ : computerWins++;
      updateScores();
      gameFinished = true;
      playAgainButton.classList.remove('hide');
    } else if (moves === 9) {
      messages.textContent = "It's a Draw!";
      gameFinished = true;
      playAgainButton.classList.remove('hide');
    } else {
      turnDisplay.textContent = "Player's Turn";
    }
  }

  function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    messages.textContent = '';
    currentPlayer = 'X';
    moves = 0;
    gameFinished = false;
    turnDisplay.textContent = "Player's Turn";
    playAgainButton.classList.add('hide');
  }

  function updateScores() {
    yourWinsDisplay.textContent = `Your Wins: ${yourWins}`;
    computerWinsDisplay.textContent = `Computer's Wins: ${computerWins}`;
  }

  cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(cell, index));
  });

  playAgainButton.addEventListener('click', resetGame);
  resetGameButton.addEventListener('click', () => {
    yourWins = 0;
    computerWins = 0;
    updateScores();
    resetGame();
  });

  turnDisplay.textContent = "Player's Turn";
});
