document.addEventListener("DOMContentLoaded", function () {
    const ROWS = 6;
    const COLS = 7;
    const board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    let currentPlayer = "Player 1";
    const message = document.querySelector(".message");

    const boardElement = document.querySelector(".board");
    const resetButton = document.querySelector(".reset-button");

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = row;
            cell.dataset.col = col;
            boardElement.appendChild(cell);
        }
    }

    function handleMove(row, col) {
        if (board[row][col] === null) {
            const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
            board[row][col] = currentPlayer === "Player 1" ? "red" : "yellow";
            cell.style.backgroundColor = board[row][col];
            if (checkWin(row, col)) {
                message.textContent = `${currentPlayer} wins!`;
                boardElement.removeEventListener("click", handleCellClick);
            } else if (board.flat().every((cell) => cell !== null)) {
                message.textContent = "It's a draw!";
                boardElement.removeEventListener("click", handleCellClick);
            } else {
                currentPlayer = currentPlayer === "Player 1" ? "Player 2" : "Player 1";
                message.textContent = `${currentPlayer}'s turn`;
            }
        }
    }

    function checkWin(row, col) {
        let count = 1;
        for (let i = col - 1; i >= 0 && board[row][i] === board[row][col]; i--) {
            count++;
        }
        for (let i = col + 1; i < COLS && board[row][i] === board[row][col]; i++) {
            count++;
        }
        if (count >= 4) return true;

        count = 1;
        for (let i = row - 1; i >= 0 && board[i][col] === board[row][col]; i--) {
            count++;
        }
        for (let i = row + 1; i < ROWS && board[i][col] === board[row][col]; i++) {
            count++;
        }
        if (count >= 4) return true;

        count = 1;
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0 && board[i][j] === board[row][col]; i--, j--) {
            count++;
        }
        for (let i = row + 1, j = col + 1; i < ROWS && j < COLS && board[i][j] === board[row][col]; i++, j++) {
            count++;
        }
        if (count >= 4) return true;

        count = 1;
        for (let i = row - 1, j = col + 1; i >= 0 && j < COLS && board[i][j] === board[row][col]; i--, j++) {
            count++;
        }
        for (let i = row + 1, j = col - 1; i < ROWS && j >= 0 && board[i][j] === board[row][col]; i++, j--) {
            count++;
        }
        if (count >= 4) return true;

        return false;
    }

    function handleCellClick(event) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        handleMove(row, col);
    }

    boardElement.addEventListener("click", handleCellClick);

    resetButton.addEventListener("click", function () {
        boardElement.addEventListener("click", handleCellClick);
        currentPlayer = "Player 1";
        board.forEach((row) => row.fill(null));
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.style.backgroundColor = "#cccccc";
        });
        message.textContent = "Player 1's turn";
    });
});
