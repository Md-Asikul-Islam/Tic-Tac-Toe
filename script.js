document.addEventListener("DOMContentLoaded", () => {
    const squares = document.querySelectorAll(".square");
    const message = document.querySelector(".message");
    const restartButton = document.querySelector("button");

    let board = Array(9).fill("");
    let currentPlayer = "X";
    let gameActive = true;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const handleSquareClick = (index) => {
        if (board[index] || !gameActive) return;

        board[index] = currentPlayer;
        squares[index].textContent = currentPlayer;

        checkWinner();
        if (gameActive) switchPlayer();
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    };

    const checkWinner = () => {
        for (const [a, b, c] of winningCombinations) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                message.textContent = `🎉 ${board[a]} Wins!`;
                return;
            }
        }

        if (!board.includes("")) {
            gameActive = false;
            message.textContent = "😲 It's a Draw!";
        }
    };

    const restartGame = () => {
        board.fill("");
        squares.forEach(square => (square.textContent = ""));
        currentPlayer = "X";
        gameActive = true;
        message.textContent = "";
    };

    squares.forEach((square, index) => square.addEventListener("click", () => handleSquareClick(index)));
    restartButton.addEventListener("click", restartGame);
});
