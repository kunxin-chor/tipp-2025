// data.js: Handles API calls and word/letter validation for the Scrabble game.

/**
 * Checks if a word is valid using a public word API. Returns a Promise<boolean>.
 * @param {string} word
 * @returns {Promise<boolean>}
 */
async function checkWordValid(word) {
    if (!word || typeof word !== 'string' || word.length === 0) return false;
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
        if (!response.ok) return false;
        const data = await response.json();
        // If definitions exist, the word is valid
        return Array.isArray(data) && data.length > 0 && data[0].meanings && data[0].meanings.length > 0;
    } catch (e) {
        return false;
    }
}
window.checkWordValid = checkWordValid;

/**
 * Fetches random letters for the player's hand. Returns a Promise<string[]>.
 * @param {number} count
 * @returns {Promise<string[]>}
 */
// Scrabble letter frequencies
const SCRABBLE_LETTER_BAG = [
    ...'E'.repeat(12),
    ...'A'.repeat(9),
    ...'I'.repeat(9),
    ...'O'.repeat(8),
    ...'N'.repeat(6),
    ...'R'.repeat(6),
    ...'T'.repeat(6),
    ...'L'.repeat(4),
    ...'S'.repeat(4),
    ...'U'.repeat(4),
    ...'D'.repeat(4),
    ...'G'.repeat(3),
    ...'B'.repeat(2),
    ...'C'.repeat(2),
    ...'M'.repeat(2),
    ...'P'.repeat(2),
    ...'F'.repeat(2),
    ...'H'.repeat(2),
    ...'V'.repeat(2),
    ...'W'.repeat(2),
    ...'Y'.repeat(2),
    'K', 'J', 'X', 'Q', 'Z'
];

function createBag() {
    const bag = [...SCRABBLE_LETTER_BAG];
    return bag;
}

window.createBag = createBag;

