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


async function enterWord(word) {
    if (gameOver) {
        showMessage('Game over! Start a new game.', 'danger');
        return;
    }
    word = word.trim().toUpperCase();
    if (!word || word.length === 0) {
        showInvalidWord(word);
        return;
    }
    if (!canFormWord(word, hand)) {
        showInvalidWord(word);
        return;
    }
    const valid = await checkWordValid(word);
    if (!valid) {
        showInvalidWord(word);
        return;
    }
    // Word is valid
    const wordScore = calcScore(word);
    score += wordScore;
    hand = removeLettersFromHand(word, hand);
    turnsLeft--;
    addLogEntry(word, wordScore);
    updateScore(score);
    updateTurnsLeft(turnsLeft);
    // updateHand(hand);
    replenish();
    showMessage(`+${wordScore} points for ${word}!`, 'success');
    if (turnsLeft <= 0) {
        endGame();
        return;
    }
    // Optionally auto-replenish after word played
    //replenish();
}

function redraw() {
    if (gameOver) {
        showMessage('Game over! Start a new game.', 'danger');
        return;
    }
    // Put all hand letters back in bag
    bag.push(...hand);
    hand = drawFromBag(HAND_SIZE);
    updateHand(hand);
    showMessage('All tiles redrawn!', 'warning');
}


function replenish() {
    if (gameOver) {
        showMessage('Game over! Start a new game.', 'danger');
        return;
    }
    const toDraw = HAND_SIZE - hand.length;
    if (toDraw > 0) {
        hand = hand.concat(drawFromBag(toDraw));
    }
    updateHand(hand);
    showMessage('Hand replenished!', 'primary');
}

function newGame() {
    bag = createBag();
    hand = [];
    score = 0;
    turnsLeft = 10;
    gameOver = false;
    // Clear log
    const table = document.getElementById('log-table');
    if (table) {
        const tbody = table.querySelector('tbody');
        if (tbody) tbody.innerHTML = '';
    }
    updateScore(score);
    updateTurnsLeft(turnsLeft);
    showMessage('New game started!', 'success');
    replenish();
}


function endGame() {
    gameOver = true;
    showMessage(`Game over! Final score: ${score}`, 'danger');
}

// Optionally: handle invalid word feedback
function invalidWord(word) {
    showInvalidWord(word);
    showMessage(`Invalid word: ${word}`, 'danger');
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

// --- Helper functions ---

const HAND_SIZE = 12;
let score = 0;
let turnsLeft = 10;
let gameOver = false;

function drawFromBag(count) {
    const drawn = [];
    for (let i = 0; i < count; i++) {
        if (bag.length === 0) {
            bag = createBag();
        }
        const idx = Math.floor(Math.random() * bag.length);
        drawn.push(bag[idx]);
        bag.splice(idx, 1);
    }
    return drawn;
}

function canFormWord(word, handArr) {
    const handCopy = [...handArr];
    for (let ch of word) {
        const idx = handCopy.indexOf(ch);
        if (idx === -1) return false;
        handCopy.splice(idx, 1);
    }
    return true;
}

function removeLettersFromHand(word, handArr) {
    const handCopy = [...handArr];
    for (let ch of word) {
        const idx = handCopy.indexOf(ch);
        if (idx !== -1) handCopy.splice(idx, 1);
    }
    return handCopy;
}

function calcScore(word) {
    let sum = 0;
    for (let ch of word) {
        sum += SCRABBLE_TILE_SCORES[ch] || 0;
    }
    return sum;
}