'use strict';


// valori di defualt nelle funzioni
// const bookings = [];
//
// const createBooking = function (flightNum, numPassenger = 1, price = 199) {
//     //Default values in old way before ES6
//     // numPassenger = numPassenger || 1;
//     // price = price || 199;
//
//     //Default values in ES6 way directly in arguments and are DINAMIC
//     // so, for example: function (flightNum, numPassenger = 1, price = 199 * numPassenger)
//
//
//     const booking = {
//         flightNum,
//         numPassenger,
//         price
//     }
//     console.log(booking);
//     bookings.push(booking);  // aggiunge metodo a funzione
// }
//
// createBooking('LH123', 2);
// createBooking('LH123', undefined,  2); //trucco per saltare parametro

// High order functions e Callback functions

// const oneWord = function (str) {
//     return str.replace(/' /g, '').toLowerCase();
// };
//
// const upperFirstWord = function (str) {
//     const [first, ...other] = str.split(' ');
//     return [first.toUpperCase(), ...other].join(' ');
// };
//
// // High-order function (function in arguments) n- High level of abstraction
// const transformer = function (str, fn) {
//     console.log(`Original string ${str}`);
//     console.log(`Transformed string: ${fn(str)}`);
//     console.log(`Transformed by: ${fn.name}`);
// };
// //callback 1
// transformer('Javascript is the best!', upperFirstWord);
// //callback 2
// transformer('Javascript is the best!', oneWord);
//
// // JS uses callback all the time
// const high5 = function () {
//     console.log('👋');
// };
//
// document.body.addEventListener('click', high5);
// ['Jonas', 'Martha', 'Adam'].forEach(high5);


// primo accenno alla logica delle closures

// const greet = function (greeting) {
//     return function(name){
//         console.log(`${greeting} ${name}`);
//     }
// }

// 131

// // la stessa con arrow function. Non servono ne' parentesi ne' return
// const greet = greeting => name => console.log(`${greeting} ${name}`);
//
// const greeterHey = greet('Hey');
// greeterHey('Jonas');
// greeterHey('Steven');
//
// //funziona anche così
// greet('Hello')('Jonas');

//132

const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // book: function() {} - old way to write methods
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${flightNum}`);
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name})
    },

};

lufthansa.book(238, 'Bruno Italiano');
console.log(lufthansa);
lufthansa.book(654, 'Silvia Viscardi');

const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
    // qui potremmo copiare tutto il metodo book in lufthansa ma non sarebbe una buona pratica

};

const book = lufthansa.book;
//book(23, 'pinco pallino'); // non funziona perchè this non trova a quale scope fare riferimenti

//Metodo 1 CALL
book.call(eurowings, 23, 'Pinco Pallino');
book.call(lufthansa, 239, 'Cristina Cremaschi');

const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
}

// Apply method (not used anymore)
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);

//better then apply
book.call(swiss, ...flightData);

//bind method
// book.call(eurowings, 23, 'Pinco Pallino');

const bookEW = book.bind(eurowings); // return a new function where this is set to eurowings
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Cristina Creemaschi');
bookEW23('Lorena Portalupi');

// With Event Listeners
// Bind pone this in lufthansa
console.log('---with event listener ---');
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
    console.log(this)
    this.planes++
    console.log(this.planes);
}
document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//Partial application (with preset parameters)

//General function to adding tax
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
//oppure, nel caso abbiamo un value come preset
const addVAT = addTax.bind(null, 0.23); // bind aggiunge il preset di value a addTax
console.log(addVAT(100));
console.log(addVAT(50));

//abbreviando tutto

const addTaxRate = function (rate) {
    return function (value) {
        return value + value * rate;
    };
};

const addVat2 = addTaxRate(0.23);
console.log(addVAT(100));
console.log(addVAT(23));

///////////////////////////////////////
// Coding Challenge #2

/*
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! Take all the time you need. Think about WHEN exactly the callback function is executed, and what that means for the variables involved in this example.

GOOD LUCK 😀
*/


(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', function () {
      header.style.color = 'blue';
    })
  })();









