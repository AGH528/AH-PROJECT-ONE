document.addEventListener('DOMContentLoaded', function() {
// Word List
    const wordList = ["APPLE", "LEMON", "GRAPE", "PEACH", "MANGO"]; 
    let solution = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase(); 
    let currentGuess = "";
    const tilesPerRow = 5;

    let currentPlayer = 1;
    const turnIndicator = document.getElementById("turn-indicator");
    const board = document.getElementById("board");
    const keyboard = document.getElementById("keyboard");
    const enterBtn = document.getElementById("enter-btn");
    const resetBtn = document.getElementById("reset-btn");
    const hintBtn = document.getElementById("hint-btn");
    const message = document.getElementById("message");

    let tiles = [];
    let isGameOver = false;
    let hintUsed = false;

// Game Board
    for (let i = 0; i < tilesPerRow; i++) {
        const tile = document.createElement("div");
        tile.classList.add("tile");
        board.appendChild(tile);
        tiles.push(tile);
    }
// Keyboard
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    letters.forEach((letter) => {
        const key = document.createElement("div");
        key.classList.add("key");
        key.textContent = letter;
        key.addEventListener("click", () => handleKeyClick(letter));
        keyboard.appendChild(key);
    });

// Turn Indicator 
    function updateTurnIndicator() {
        const playerText = currentPlayer === 1 ? "PLAYER ONE GO" : "PLAYER TWO GO";
        turnIndicator.textContent = playerText;
    }

// Letter Click Change
    function handleKeyClick(letter) {
        if (isGameOver) return;

        if (currentGuess.length < tilesPerRow) {
            currentGuess += letter;
            updateTiles();
        }
    }

// Update board tiles w/ current guess 
    function updateTiles() {
        tiles.forEach((tile, index) => {
            tile.textContent = currentGuess[index] || "";
        });
    }

 // Enter button click   
    enterBtn.addEventListener("click", () => {
        if (currentGuess.length === tilesPerRow) {
            checkGuess();
        } else {
            showMessage("Please enter a 5-letter word");
        }
    });

 // Check if word correct   
    function checkGuess() {
        message.textContent = ""; 
        const guessArray = currentGuess.split("");
        const solutionArray = solution.split("");
// Update tile
        guessArray.forEach((letter, index) => {
            const tile = tiles[index];
            
            if (tile) {
                if (solutionArray[index] === letter) {
                    tile.classList.add("correct");
                }
            } else {
                console.error("Tile not found for index:", index);
            }
        });
// Check is guess is correct
        if (currentGuess === solution) {
            showMessage(`Player ${currentPlayer} wins!`);
            isGameOver = true;
// Confetti
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });

        } else {

            currentPlayer = currentPlayer === 1 ? 2 : 1;
            currentGuess = ""; 
            updateTiles();
            updateTurnIndicator(); 
        }
    }

    function showMessage(text) {
        message.textContent = text;
    }

    hintBtn.addEventListener("click", () => {
        if (!hintUsed && !isGameOver) {
            hintUsed = true; 
            revealHint();
        }
    });
// Show hint letter
    function revealHint() {
        const solutionArray = solution.split("");
        const emptyIndexes = tiles
            .map((tile, index) => (tile.textContent === "" ? index : null))
            .filter(index => index !== null);

        if (emptyIndexes.length > 0) {
      
            const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

            if (tiles[randomIndex]) {
                tiles[randomIndex].textContent = solutionArray[randomIndex]; 
                tiles[randomIndex].classList.add("correct"); 
            } else {
                console.error("Tile not found for index:", randomIndex);
            }
        }
    }
// Resets game
    resetBtn.addEventListener("click", () => {
        currentGuess = "";
        isGameOver = false;
        hintUsed = false; 
        currentPlayer = 1; 
        solution = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
        tiles.forEach((tile) => {
            tile.textContent = "";
            tile.classList.remove("correct");
        });
        message.textContent = "";
        updateTurnIndicator(); 
    });

// Initialize the Game
    updateTurnIndicator(); 
});
