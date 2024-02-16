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
    let playerTurn = true;
  
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
        if (playerTurn && !gameFinished && cell.textContent === '') {
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
                playerTurn = false; // Disable player's turn while waiting for computer's move
                setTimeout(computerMove, 2000); // Delay computer's move by 2 seconds
            }
        }
    }
  
    function computerMove() {
        const bestMove = findBestMove(gameBoard);
        const cellIndex = bestMove.index;
        cells[cellIndex].textContent = 'O';
        gameBoard[cellIndex] = 'O';
        moves++;
        checkGameResult();
    }
  
    function findBestMove(board) {
        let bestScore = -Infinity;
        let move = {};
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, 0, false);
                board[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move.index = i;
                }
            }
        }
        return move;
    }
  
    function minimax(board, depth, isMaximizing, alpha, beta) {
        const result = checkWinner(board);
        if (result !== null) {
            if (result === 'O') {
                return 10 - depth; // If computer wins, prioritize winning
            } else if (result === 'X') {
                return depth - 10; // If player wins, prioritize preventing player from winning
            } else {
                return 0; // Draw
            }
        }
    
        if (depth >= 7) { // Increase depth limit
            return 0; // Evaluate the board position
        }
    
        if (isMaximizing) {
            let maxScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    let score = minimax(board, depth + 1, false, alpha, beta);
                    board[i] = '';
                    maxScore = Math.max(score, maxScore);
                    alpha = Math.max(alpha, score);
                    if (beta <= alpha) break; // Alpha-beta pruning
                }
            }
            return maxScore;
        } else {
            let minScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    let score = minimax(board, depth + 1, true, alpha, beta);
                    board[i] = '';
                    minScore = Math.min(score, minScore);
                    beta = Math.min(beta, score);
                    if (beta <= alpha) break; // Alpha-beta pruning
                }
            }
            return minScore;
        }
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
            playerTurn = true; // Enable player's turn after computer's move
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
        playerTurn = true; // Ensure player's turn is enabled after reset
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
