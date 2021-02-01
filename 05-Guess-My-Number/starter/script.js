'use strict';

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = '🎉 Correct Number!'
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 20;

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function (message) {
    document.querySelector('.message').textContent = (message);
}

document.querySelector('.check').addEventListener('click', function () {
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    if (!guess) {
        displayMessage('⛔️ No number!');

        //Whene player wins
    } else if (guess === secretNumber) {
        displayMessage('🎉 Correct number!');
        document.querySelector('body').style.backgroundColor = '#60b347';
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('.number').textContent = secretNumber;
        if (score > highscore) {
            highscore = score;
        }
        document.querySelector('.highscore').textContent = highscore;

    } else if (guess !== secretNumber) {
        if (score > 1) {
            displayMessage(guess > secretNumber ? '📈 Too high' : '📉 Too low');
            score--;
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('💥 You lost the game!');
            document.querySelector('.score').textContent = 0;
        }
    }
});


    document.querySelector('.again').addEventListener('click', function () {
        //restore score
        score = 20;
        document.querySelector('.score').textContent = score;
        //restore secretNumber
        secretNumber = Math.trunc(Math.random() * 20) + 1;
        //restore message
        displayMessage('Start guessing...');
        //restore guess
        document.querySelector('.guess').value = '';
        //restore background color
        document.querySelector('body').style.backgroundColor = '#222';
        //restore .number width
        document.querySelector('.number').textContent = '?';
        document.querySelector('.number').style.width = '15rem';
    });