// views.js: Handles drawing and UI events for the Scrabble game.

/**
 * Renders the main game view: score, turns left, hand, and input.
 * @param {Object} state - { score, turnsLeft, hand }
 */
function renderGameView(state) {
    // Render score
    const scoreEl = document.getElementById('score');
    if (scoreEl) scoreEl.textContent = state.score;

    // Render turns left
    const turnsEl = document.getElementById('turns');
    if (turnsEl) turnsEl.textContent = state.turnsLeft;

    // Render hand (letters)
    const handEl = document.getElementById('hand');
    if (handEl) handEl.textContent = state.hand ? state.hand.join(' ') : '';

    // Clear invalid word message
    const invalidMsg = document.getElementById('invalid-word-msg');
    if (invalidMsg) invalidMsg.textContent = '';
}
window.renderGameView = renderGameView;

/**
 * Sets up event handlers for the game view.
 * @param {Object} handlers - { enterWord, redraw, replenish, newGame, endGame }
 */
function setupViewHandlers(handlers) {
    // Play word
    const playBtn = document.getElementById('play-btn');
    const wordInput = document.getElementById('word-input');
    if (playBtn && wordInput && handlers.enterWord) {
        playBtn.onclick = () => {
            handlers.enterWord(wordInput.value.trim());
        };
        wordInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                handlers.enterWord(wordInput.value.trim());
            }
        };
    }
    // Redraw
    const redrawBtn = document.getElementById('redraw-btn');
    if (redrawBtn && handlers.redraw) {
        redrawBtn.onclick = handlers.redraw;
    }
    // Replenish
    const replenishBtn = document.getElementById('replenish-btn');
    if (replenishBtn && handlers.replenish) {
        replenishBtn.onclick = handlers.replenish;
    }
    // New Game
    const newGameBtn = document.getElementById('newgame-btn');
    if (newGameBtn && handlers.newGame) {
        newGameBtn.onclick = handlers.newGame;
    }
    // End Game
    const endGameBtn = document.getElementById('endgame-btn');
    if (endGameBtn && handlers.endGame) {
        endGameBtn.onclick = handlers.endGame;
    }
}
window.setupViewHandlers = setupViewHandlers;

// Optionally, stub out UI update helpers for score, hand, etc.
function updateScore(score) {
    const scoreEl = document.getElementById('score');
    if (scoreEl) scoreEl.textContent = score;
}
window.updateScore = updateScore;
function updateTurnsLeft(turnsLeft) {
    const turnsEl = document.getElementById('turns');
    if (turnsEl) turnsEl.textContent = turnsLeft;
}
window.updateTurnsLeft = updateTurnsLeft;


function updateHand(hand) {

    const SCRABBLE_TILE_SCORES = {
        A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4, I: 1, J: 8, K: 5, L: 1, M: 3,
        N: 1, O: 1, P: 3, Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8, Y: 4, Z: 10
    };

    const handEl = document.getElementById('hand');
    if (!handEl) return;
    handEl.innerHTML = '';
    if (!hand || hand.length === 0) return;
    hand.forEach(letter => {
        const tile = document.createElement('span');
        tile.className = 'scrabble-tile d-inline-block position-relative text-center mx-1 mb-2';
        tile.style.display = 'inline-block';
        tile.style.width = '64px';
        tile.style.height = '72px';
        tile.style.border = '2px solid #bfa76f';
        tile.style.borderRadius = '6px';
        tile.style.background = '#f5e6b2';
        tile.style.fontWeight = 'bold';
        tile.style.fontSize = '2rem';
        tile.style.verticalAlign = 'middle';
        tile.style.boxShadow = '2px 2px 4px #bfa76f55';
        tile.style.position = 'relative';
        tile.style.userSelect = 'none';
        tile.textContent = letter;
        // Score at lower right
        const score = document.createElement('small');
        score.textContent = SCRABBLE_TILE_SCORES[letter.toUpperCase()] || '';
        score.style.position = 'absolute';
        score.style.bottom = '4px';
        score.style.right = '8px';
        score.style.fontSize = '0.9rem';
        score.style.color = '#7c6a3b';
        score.style.textAlign = 'right';
        score.style.zIndex = '2';
        score.style.background = 'transparent';
        tile.appendChild(score);
        handEl.appendChild(tile);
    });
}

window.updateHand = updateHand;
function showInvalidWord(word) {
    const invalidMsg = document.getElementById('invalid-word-msg');
    if (invalidMsg) invalidMsg.textContent = `Invalid word: ${word}`;
}
window.showInvalidWord = showInvalidWord;

function addLogEntry(word, score) {
    const table = document.getElementById('log-table');
    if (!table) return;
    const tbody = table.querySelector('tbody');
    if (!tbody) return;
    const rowCount = tbody.rows.length + 1;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class='text-center'>${rowCount}</td><td class='text-center'>${word}</td><td class='text-center'>${score}</td>`;
    tbody.appendChild(tr);
}
window.addLogEntry = addLogEntry;

function showMessage(msg, type = 'info') {
    // type: 'info', 'success', 'warning', 'danger'
    let msgEl = document.getElementById('game-message');
    if (msgEl) {
        msgEl.innerHTML = `<div class='alert alert-${type} mb-0 py-2 px-3'>${msg}</div>`;
    }
}
window.showMessage = showMessage;
