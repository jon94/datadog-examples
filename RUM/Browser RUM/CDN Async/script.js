let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Function to toggle the symbol
function toggleSymbol(cell) {
    if (gameActive && cell.textContent === '') {
        if (featureFlags.useTriangleSymbol) {
            cell.textContent = currentPlayer === 'X' ? '△' : 'O';
        } else {
            cell.textContent = currentPlayer;
        }
        makeMove(Array.from(cell.parentNode.children).indexOf(cell));
    }
}

// Update the makeMove function
function makeMove(cellIndex) {
    if (gameBoard[cellIndex] === '' && gameActive) {
        gameBoard[cellIndex] = currentPlayer;
        checkResult();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.querySelector('.status').textContent = `Player ${currentPlayer}'s Turn`;
}

function checkResult() {
    for (const combination of winningCombination) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            displayResult(`Player ${gameBoard[a]} wins!`);
            return;
        }
    }

    if (!gameBoard.includes('') && gameActive) {
        gameActive = false;
        displayResult("It's a draw!");
    }
}

function displayResult(message) {
    const resultMessage = document.getElementById('result-message');
    resultMessage.textContent = message;
    document.querySelector('.result-screen').style.display = 'flex';
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;

    document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
    document.querySelector('.status').textContent = "Player X's Turn";

    document.querySelector('.result-screen').style.display = 'none';
}

document.querySelector('.status').textContent = "Player X's Turn";