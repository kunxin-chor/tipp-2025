// script.js: Game logic skeleton for Scrabble word-score game.
// Skeleton event handlers for the game

// Scrabble tile scores
const SCRABBLE_TILE_SCORES = {
    A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3,
    N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
};

// use `createBag()` to get an array of alphabets using the letter frequency of the Scrabble game
let bag = createBag();
let hand = []; // hand is a string of letters


function enterWord(word) {
    showMessage(`enterWord event triggered with: ${word}`, 'info');
    addLogEntry("TEST", 10); // the addLogEntry function allows you to add a row to the log table
    // TODO: Validate word, update score, update hand
}

function redraw() {
    showMessage('redraw event triggered', 'warning');
    // TODO: Replace all letters in hand
}


function replenish() {
    showMessage('replenish event triggered', 'primary');

    // TODO: Draw up to 12 letters, if the bag is empty while drawing, use `createBag` to replenish the `bag` array and continue drawing.


    // TODO: Update the hand display
    updateHand(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']);
}

function newGame() {
    showMessage('newGame event triggered', 'success');
    // TODO: Initialize game state
    replenish(); // draw the initial hand
}


function endGame() {
    showMessage('endGame event triggered', 'danger');
    // TODO: Handle end of game logic
}

// Optionally: handle invalid word feedback
function invalidWord(word) {
    showMessage(`invalidWord event triggered with: ${word}`, 'danger');
    // TODO: Show feedback for invalid word
}


// TODO: Do not change the line after this
/**
 * Sets up the game view with the provided event handlers.
 * @param {Object} handlers - { enterWord, redraw, replenish, newGame, endGame }
 */
setupViewHandlers({
    enterWord,
    redraw,
    replenish,
    newGame,
    endGame
});
    
// Run the game upon script start
document.addEventListener('DOMContentLoaded', newGame);