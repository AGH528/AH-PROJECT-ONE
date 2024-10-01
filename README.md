# AH-PROJECT-ONE
**Introduction**:

I'm going to present my Wordle-inspired game. It's a two-player word guessing game where each player takes turns guessing a word. The game keeps track of turns, provides hints, and highlights the correct guesses in green."

**Features**:
Players alternate turns to guess word.
A turn indicator shows whose turn it is.
If player guesses correct letter in correct position, it turns green.
The game includes a hint feature to reveal one correct letter, but can only be used once per game.

**Game Breakdown**:

A. HTML Structure
*There are divs for the game board, the on-screen keyboard, the turn indicator, and the buttons for entering guesses, resetting the game, and using hints.*

B. CSS Styling
*CSS to style the game grid, the keyboard, and the correct guesses. The game board and keyboard are set up as grids to keep everything aligned and organized.*

C. JavaScript Game Logic
*JS to handle the core game logic, including player turns, checking guesses, highlighting correct answers, and handling the hint and reset functionalities.*

1. Turn Handling: The currentPlayer variable keeps track of whose turn it is. After each guess, the game switches the player, and the updateTurnIndicator()function updates the display to show which player's turn it is.

2. Guess Validation: Player enters a word and clicks 'Enter', the checkGuess() (58, 64)  function compares the player's guess with the correct word. If a letter is in the correct position, it adds the .correct  class to highlight it in green.

3. Hint Feature: Player clicks the 'Hint' button, the revealHint() function reveals one correct letter by selecting a random empty tile and filling it with the correct letter. 

4. Reset Functionality: The resetBtn resets the game by clearing the board, picking a new word, and bringing the game back to Player 1.