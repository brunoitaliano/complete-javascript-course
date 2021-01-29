'use strict';

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🎉 Correct Number!'
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 20;

let secretNumber = Math.trunc(Math.random()*20)+1;
let score = 20;
//solo per test

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number (document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    if (!guess) {
        document.querySelector('.message').textContent = '⛔️ No number!';

        //Whene player wins
    } else if (guess === secretNumber) {
        document.querySelector('.message').textContent = '🎉 Correct number!';
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('.number').textContent = secretNumber;


    } else if (guess > secretNumber) {
        if (score > 1 ) {
            document.querySelector('.message').textContent = '📈 Too high';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = '💥 You lost the game!';
            document.querySelector('.score').textContent = 0;
        }
    } else if (guess < secretNumber) {
        if (score > 1 ) {
            document.querySelector('.message').textContent = '📉 Too low';
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            document.querySelector('.message').textContent = '💥 You lost the game!';
            document.querySelector('.score').textContent = 0;
        }
    }
});

document.querySelector('.again').addEventListener('click', function () {
    //restore score
    score = 20;
    document.querySelector('.score').textContent = score;
    //restore secretNumber
    secretNumber = Math.trunc(Math.random()*20)+1;
    //restore message
    document.querySelector('.message').textContent = 'Start guessing...';
    //restore guess
    document.querySelector('.guess').value = '';
    //restore background color
    document.querySelector('body').style.backgroundColor = '#222';
    //restore .number width
    document.querySelector('.number').textContent = '?';
    document.querySelector('.number').style.width = '15rem';
});