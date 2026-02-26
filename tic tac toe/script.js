// ===== Game Variables =====

let currentPlayer = "X";        // Who is playing right now ("X" or "O")
let gameActive = true;           // Is the game still going?
let board = ["", "", "", "", "", "", "", "", ""];  // 9 empty cells (index 0 to 8)

// All possible winning combinations (by cell index)
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6], // Diagonal top-right to bottom-left
];

// ===== Get Elements from HTML =====
const cells = document.querySelectorAll(".cell");       // All 9 cells
const statusMessage = document.getElementById("status-message");
const restartBtn = document.getElementById("restart-btn");


// ===== Handle a Cell Click =====
function handleCellClick(event) {
    const cell = event.target;               // The cell that was clicked
    const index = cell.dataset.index;        // Get cell index (0-8) from data-index

    // Ignore click if cell is already filled or game is over
    if (board[index] !== "" || !gameActive) {
        return;
    }

    // Place the current player's mark
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); // adds class "x" or "o" for color

    // Check if this move wins the game
    if (checkWinner()) {
        statusMessage.textContent = `Player ${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }

    // Check if the board is full (draw)
    if (board.every(cell => cell !== "")) {
        statusMessage.textContent = "It's a Draw! 🤝";
        gameActive = false;
        return;
    }

    // Switch to the other player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusMessage.textContent = `Player ${currentPlayer}'s Turn`;
}


// ===== Check if Someone Won =====
function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;

        // If all three cells in a combo are the same (and not empty)
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
            // Highlight the winning cells
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");
            return true; // Someone won
        }
    }
    return false; // No winner yet
}


// ===== Restart the Game =====
function restartGame() {
    // Reset all variables
    currentPlayer = "X";
    gameActive = true;
    board = ["", "", "", "", "", "", "", "", ""];

    // Clear all cells on screen
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o", "winner");
    });

    // Reset the status message
    statusMessage.textContent = "Player X's Turn";
}


// ===== Add Event Listeners =====
cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
