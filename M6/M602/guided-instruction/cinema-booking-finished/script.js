const movies = {
    movie1: "Interstellar: Director's Cut",
    movie2: "The French Dispatch",
    movie3: "Dune: Part Two",
    movie4: "The Batman",
    movie5: "Everything Everywhere All at Once"
};

// add event handler to the form 
document.querySelector('form').addEventListener('submit', function(event) {

    event.preventDefault();


    // extract out the values from the form
    const form = event.target;
    
    const name = form.elements['name'].value;
    const email = form.elements['email'].value;
    const movie = form.elements['movie'].value;
    const movieTitle = movies[movie];
    const payment = form.elements['payment'].value;
    const selectedSeats = [];
    for (let s of form.elements['seats']) {
        if (s.checked) {
            selectedSeats.push(s.value);
        }
    }

    // make sure at least one payment type is selected
    if (!payment)  {
        const paymentErrorDiv = document.querySelector('#error-payment');
        paymentErrorDiv.innerHTML = 'Please select a payment type.';
    }

    console.log(name, email, movieTitle, payment, selectedSeats);
});

document.querySelector('#name').addEventListener('blur', function(event) {
    const value = event.target.value.trim();
    const errorSpan = document.querySelector('#error-name');

    if (value === '') {
        errorSpan.innerHTML = 'Please enter your full name.';
    } else {
        errorSpan.innerHTML = '';
    }
});

document.querySelector('#email').addEventListener('blur', function(event) {
    const value = event.target.value.trim();
    const errorSpan = document.querySelector('#error-email');

    if (value === '') {
        errorSpan.innerHTML = 'Please enter your email address.';
    } else if (!value.includes('@')) {
        errorSpan.textContent = 'Please enter a valid email address.';
    } else {
        errorSpan.innerHTML = '';
    }
});