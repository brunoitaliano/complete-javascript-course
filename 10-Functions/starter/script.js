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
//     bookings.push(booking);
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

// la stessa con arrow function. Non servono ne' parentesi ne' return
const greet = greeting => name => console.log(`${greeting} ${name}`);

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

//funziona anche così
greet('Hello')('Jonas');




