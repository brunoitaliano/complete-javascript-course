'use strict';
// OOP in JS

const Person = function (firstName, birthYear) {
    // instance properties
    this.firstName = firstName;
    this.birthYear = birthYear;

    // NO WRITE METHODS inside constructor function
    // VEDI PROTOTYPE QUI SOTTO E FUORI DAL CONSTRUCTOR
    // this.calcAge = function () {
    //     console.log(2037 - this.birthYear);
    // }
};



const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype (with new )
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

// const bruno = 'bruno';
//
// console.log(matilda instanceof Person); // true
// console.log(bruno instanceof Person); // false

///////////////////////////////////////////////////
// Prototypes

// così si scrivono i metodi dell'istanza
Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
}
console.log(Person.prototype);
jonas.calcAge();

// in prototype possiamo anche registrare alcune proprietà

Person.prototype.species = 'Homo Sapiens';
console.log(jonas, matilda); // in __proto__ troverai la proprietà species
console.log(jonas.species); // restituisce il valore della proprietà
// Species NON é una proprietà appartenente all'istanza
console.log(jonas.hasOwnProperty('firstName')); // true
console.log(jonas.hasOwnProperty('species')); // false

// object.prototype (top of prototype chain)
console.log(jonas.__proto__); // in prototype di Jonas
console.log(jonas.__proto__.__proto__); // in prototype del constructor
console.log(jonas.__proto__.__proto__.__proto__); // null

console.log(Person.prototype.constructor); // restituisce constructor + prototype
console.dir(Person.prototype.constructor); // restituisce tutti i metodi a disposizione

// Ogni oggetto in JS ha un __proto__

// Array
const arr = [1, 2, 2, 5, 6, 4, 4, 8];
console.log(arr.__proto__); //troveremo tutti i metodi per gli array ereditati dal prototype constructor di array Array
// coontroprova
console.log(arr.__proto__ === Array.prototype); //true
// di fatto quando creaiamo un array é come se utilizzassimo sempre ->   new Array ===
console.log(arr.__proto__.__proto__); // troveremo ancora il prototype del constructor globale

// Possiamo anche creare nuovi metodi nel prototype del constructor di Array, ma non consigliato!!

Array.prototype.unique = function () {
    return [...new Set(this)]; // this é l'array ricevuto
}
console.log(arr.unique()); // funziona!!!!

// prototype di qualsiasi elemento
const h1 = document.querySelector('h1');
console.dir(h1);

//////////////////////////////////////////////////////////
// Coding Chanllenge #1

const Car = function (make, speed ) {
    this.make = make;
    this.speed = speed;
};


Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
bmw.accelerate();
bmw.accelerate();
bmw.brake();
mercedes.brake();
