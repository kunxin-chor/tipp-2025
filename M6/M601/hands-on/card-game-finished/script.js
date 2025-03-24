

let card1 = null;
let card2 = null;
let score = 0;

let pairs = generateAlphabets();
pairs = shuffleArray(pairs);

document.querySelectorAll(".card").forEach(card => {

    // assign a pair to each card
    card.innerHTML = pairs.pop();

    // show the card facedown
    card.classList.remove('card-flipped');

    // add event listner to flip the card over 
    card.addEventListener('click', (e) => {
        // if the card is already flipped, do nothing
        if (!card.classList.contains('card-flipped')) {
            card.classList.add('card-flipped');
            if (!card1) {
                card1 = e.target;
            } else if (!card2) {
                card2 = e.target;
                checkIfCardMatches();
            }
        }
    });

});

function generateAlphabets() {
    let alphabet = "ABCDEFGHIJKL";
    let pairs = [];
    // add each alphabet twice
    for (let i = 0; i < alphabet.length; i++) {
        pairs.push(alphabet[i]);
        pairs.push(alphabet[i]);
    }
    return pairs;
}

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}


function checkIfCardMatches() {
    if (card1.innerHTML === card2.innerHTML) {
        setTimeout(() => {
            card1.classList.add('card-matched');
            card2.classList.add('card-matched');
            card1 = null;
            card2 = null;
            score++;
            // update score display
            document.querySelector('#score').innerHTML = score;
        }, 500);

    } else {
        // flip card1, wait, then flip card2
        setTimeout(() => {
            card1.classList.remove('card-flipped');
            setTimeout(() => {
                card2.classList.remove('card-flipped');
                card1 = null;
                card2 = null;
            }, 500)
        }, 500);
    }

}