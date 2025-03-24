const itemDisplay = document.querySelector('#selected-item');
const amountDisplay = document.querySelector('#amount');
let currentCredit = 0;
let currentPrice = 0;

document.querySelectorAll('.coin-button').forEach(function (button) {
    button.addEventListener('click', function () {
        const buttonId = button.getAttribute('id');
        if (buttonId == 'cent10') {
            currentCredit += 0.10;
        }
        else if (buttonId == 'cent20') {
            currentCredit += 0.20;
        }
        else if (buttonId == 'dollar') {
            currentCredit += 1.00;
        }
        // update the amount display
        const currentAmount = currentCredit - currentPrice;
        amountDisplay.innerHTML = `$${currentAmount.toFixed(2)}`;
    });


})


// display the selected item in the display
document.querySelectorAll('.item').forEach(function (item) {
    item.addEventListener('click', function () {
        itemDisplay.innerHTML = item.querySelector('.item-name').innerHTML;
        currentPrice = Number(item.querySelector('.item-price').innerHTML.slice(1));
        const newAmount = currentCredit - currentPrice;
        amountDisplay.innerHTML = `$${newAmount.toFixed(2)}`;
    });
});