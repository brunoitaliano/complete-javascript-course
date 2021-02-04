'use strict';

// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
    thu: {
        open: 12,
        close: 22,
    },
    fri: {
        open: 11,
        close: 23,
    },
    sat: {
        open: 0, // Open 24 hours
        close: 24,
    },
};

// Data needed for first part of the section
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    // ES6 enhanced object literals
    openingHours,

    order(starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },


    orderDelivery({starterIndex = 1, mainIndex = 0, time = '20:00', address}) { // sono importanti i nomi degli argomenti, non l'ordine!!!!
        console.log(`Order received! ${this.starterMenu
            [starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },
    orderPasta(ing1, ing2, ing3) {
        console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
    },

    orderPizza(mainIngredient, ...otherIngredientes) { // separa il primo ingrediente dagli altri
        console.log(mainIngredient);
        console.log(otherIngredientes);
    },
};

// STRINGS

/* Le stringhe sono primitives perciò non possono essere modificate.
Per modificarle dobbiamo copiarle in un'altra variabile
 */

const airline = 'TAP Air Portugal';
const plane = 'A320';
console.log('--- METODI MUTUATI DA ARRAYS ---');
console.log('--- chiedo carattere per carattere ---');
console.log(plane[0]); // restituisce A
console.log(plane[1]); // restituisce 3
console.log(plane[2]); // restituisce 2
console.log('--- la stessa cosa può essere fatta così');
console.log('B737' [0]);
console.log('B737' [1]);
console.log('B737' [2]);
console.log('--- lunghezza stringa ---');
console.log(airline.length);
console.log('B737'.length);

console.log('--- METODI DEDICATE ALLE STRINGHE ---');
console.log('--- index ---');
console.log(airline.indexOf('r')); //restituisce 6
console.log(airline.lastIndexOf('r')); //restituisce 10 - ultima ricorrenza di r
console.log(airline.indexOf('Portugal')); //restituisce 8 (case sensitive - restituisce -1 se non trova)
console.log('--- slice ---');
console.log(airline.slice(4)); //restituisce a partire dalla quinta posizione
console.log(airline.slice(4, 7)); //restituisce a partire dalla quinta posizione e fino alla settima (ottava non inclusa!!!)
console.log(airline.slice(0, airline.indexOf(' '))); // restituisce TAP
console.log(airline.slice(airline.lastIndexOf(' ')+1)); // restituisce Portugal. Il +1 é per non stampare lo spazio
console.log(airline.slice(-2)); // estrae partendo dalla fine - stampa al
console.log(airline.slice(1, -1)); // dal secondo carattere al penultimo

console.log('--- ESEMPIO 1: check middle seat in airplane row ---');
const checkMiddleSeat = function (seat) {
    // BB and E are middle seats
    const s = seat.slice(-1);
    if(s === 'B' || s === 'E') {
        console.log('You got the middle seat 😊');
    } else {
        console.log('You got lucky 😎');
    }
}

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');



// Looping Object

//Property NAME - soluzione semplice
// for (const day of Object.keys(openingHours)) {
//     console.log(day);
// }
// soluzione articolata
// const properties = Object.keys(openingHours);
// let openStr = `We are open on ${properties.length} days: `;
// for (const day of properties) {
//     openStr += `${day}, `; // concatenamento
// }
// console.log(openStr);

// Property VALUES

// const values = Object.values(openingHours);
// console.log(values);

//Entire object
// const entries = Object.entries(openingHours);
// for (const [key, {open, close}] of entries){ // destructuring di entries e del sottoarray open/close !!!!7
//     console.log(`On ${key} we are open at ${open} and close on ${close}`);
// }

//SETS - array SENZA INDICI di VALORI UNICI

// const orderSet = new Set([
//     'Pasta',
//     'Pizza',
//     'Pizza',
//     'Risotto',
//     'Pasta',
//     'Pizza',
// ]);

// console.log(orderSet); // restituisce solo i valori unici: Pasta, Pizza, Risotto
//
// console.log(new Set('Bruno')); //restituisce un array con le singole lettere
//
// console.log(orderSet.size); // dimensione dell'array - valori unici
// console.log(orderSet.has('Pizza')); // true
// console.log(orderSet.has('Bread')); // false
// orderSet.add('Garlic Bread');
// orderSet.delete('Risotto');
// // orderSet.clear(); //cancella tutto il set
// console.log(orderSet);

//i sets sono iterable
// for (const order of orderSet) {
//     console.log(order);
// }

//é utile a diverse cose
// individuare i valori unici di un array
// const staff = ['waiter', 'chef', 'waiter', 'manager', 'chef', 'waiter'];
// const staffUnique = new Set(staff);
// console.log('--- staffUnique ---');
// console.log(staffUnique); // restituisce l'array Entries con valori unici
// const staffUniqueDes = [...new Set(staff)];
// console.log(staffUniqueDes); // restituisce un semplice array con valori unici

//é utile per cantare i valori uinici in un array
// console.log('--- conto i valori unici in una stringa ---')
// console.log(new Set('Brunoitaliano@gmail.com').size);

// MAPS
// La grande differenza fra un array e un map é che key può essere qualunque cosa, anche un altro map ecc.


// console.log('--- MAP ---');
//
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// console.log(rest.set(2, 'Lisbon, Portugal')); // nota che qui viene restituito l'intero rest con tutti i valori precedenti.
// // osserva in __proto__ tutti i metodi disponibili
//
// rest
//     .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//     .set('open', 11)
//     .set('close', 23)
//     .set(true, 'We are open :D')
//     .set(false, 'We are closed :(');
//
// console.log(rest.get('name'));
// // console.log(rest.get(true));
//
// //uso approfittando dei boolean
// const time = 21;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
//
// // MAP può essere creato anche così:
//
// const question = new Map([
//     ['question', 'What is the best programming language in the world'],
//     [1, 'C'],
//     [2, 'Java'],
//     [3, 'JavaScript'],
//     ['correct', 3],
//     [true, 'Correct 🎉'],
//     [false, 'Try again!'],
// ]);
//
// console.log(question);
//
// //Convert object to map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);
//
// // stampo le domande del quiz question
// console.log(question.get('question'));
// for (const [key, value] of question) {
//     if (typeof key === 'number') {
//         console.log(`Answer ${key}: ${value}`);
//     }
// }
// const answer = Number(prompt('Your answer')); // La risposta deve essere un Number
// console.log(answer);

// console.log(question.get(question.get('correct') === answer)); // funziona anche de IDE dice di no....


// Convert map to array
// console.log(...question);


// Optional Chaining ?

//supponiamo di estrarre un orario da openingHours per mon (non esiste...)
//per evitare che restituisca un  errore usiamo un short circuiting &&

// if (restaurant.openingHours && restaurant.openingHours.mon) {
//     console.log(restaurant.openingHours.mon.open);
//     console.log(restaurant.openingHours.mon.open);
// }

// Lo stesso con OPTIONAL CHAINING ?

// console.log(restaurant.openingHours.mon?.open);
// anche multiplo
// console.log(restaurant.openingHours?.mon?.open);

//example
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for (const day of days) {
//     const open = restaurant.openingHours[day]?.open ?? 'closed';
//     console.log(`On ${day}, we are open at ${open}`);
// }

// Methods
//test se un metodo esiste
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exists');

// Arrays
// const users = [
//     {
//         name: 'Jonas',
//         email: 'hell@jonas.io',
//     }
// ];
// console.log(users[0]?.name ?? 'Users array empty');

// && and ||
// Use ANY data type, return ANY data type, short-circuiting

// console.log('--------- OR ---------');

// console.log(3 || 'Jonas'); //se il primo valore é valido viene restituito.
// Interessante perchè permette si comporta come un ternario.....
// ricorda che non funziona se il valore é 0 -> Nullish Coalescing Operator ??
// console.log('' || 'Jonas'); // Jonas
// console.log(true || 0); // true
// console.log(undefined || null); // null. Tieni presente che anche null da' false ma nell'or prevale perchè viene dopo
// console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello

//ora vediamo come utilizzarlo al posto di un operatore ternario

// numGests é un valore che non é definito
// console.log('numGuests non definito')
// const guests1 = restaurant.numGuests || 10; // non trova il valore e restituisce 10
// console.log(guests1);
//
// console.log('numGuests = 0  || operator')
// restaurant.numGuests = 0;
// const guests2 = restaurant.numGuests || 10; // 0 equivale a false per cui restituisce 10. Errore!!! Perchè 0 é un valore concreto
// console.log(guests2);
//
// console.log('numGuests = 0  ?? operator')
//Nullish : null and undefined (NOT 0 or '')
// const guests3 = restaurant.numGuests ?? 10; // restituisce 0. Nullish Coalescing Operator ??
// console.log(guests3);
//
// console.log('--------- AND ---------');
//comportamento opposto rispetto a ||
//restituisce il primo valore false
// console.log(0 && 'Jonas'); //0
// console.log(7 && 'Jonas'); //'Jonas' perchè va all'ultimo
// console.log('Hello' && 23 && null && 'jonas'); // null

//ottimo al posto degli if
//se restuarant.orderPizza NON esiste non chiama la funzione!!
// restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'onions');


// REST OPERATOR
// on left side of =
// opposto a SPREAD, riunisce i valori in un array
// const [f, g, ...others] = [1, 2, 3, 4, 5];
// console.log(f, g, others);


// 1) destructuring

// SPREAD OPERATOR
// on right side of =
// consente di aggiungere elementi ad un array
// ... (spread operator) unisce gli elementi presi singolarmente
// spread lavora sugli array ma anche su TUTTI gli iterable elements
// Iterables: array, strings, maps, sets.

//utilizzo rest e spread insieme

// const [p, , r, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu,]; // primo e terzo elemento
// console.log(p, r, otherFood);
//
// const arr = [7, 8, 9];
// const newArr = [1, 2, ...arr];
// console.log(newArr);
// console.log(...newArr); // ottimo per passare gli argomenti ad una funzione

// proviamo ad aggiungere un nuovo piatto al menu

// const newMenu = [...restaurant.mainMenu, 'Gnocchi']
// console.log(newMenu);

// Copiamo un array con spread

// const mainMenuCopy = [...restaurant.mainMenu];

//Uniamo 2 array: mainMenu e StarterMenu

// const completeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(...completeMenu);

// spread su stringhe

// const str = 'Bruno';
// const letters = [...str, ' ', 'I.'];
// console.log(letters);

//Real world example
// const ingredients = [
//     prompt("Let's make a pasta! Ingredient 1?"),
//     prompt("Ingredient 2"),
//     prompt("Ingredient 3"),
// ];
// console.log(ingredients);

// restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
// restaurant.orderPasta(...ingredients);

//Objects

// const newRestaurant = {...restaurant, founder: 'Giuseppe'};
// console.log(newRestaurant);

//rest in objects

// const {sat, ...weekdays} = restaurant.openingHours; // tengo fuori saturday da weekdays
// console.log(weekdays);

// 2) Rest in Functions
// riceve valori e li colloca in array;
// const add = function (...numbers) {
//     let sum = 0;
//     for (let i = 0; i < numbers.length; i++) {
//         sum += numbers[i];
//     }
//     ;
//     console.log(sum);
// }
// add(2, 3);
// add(5, 3, 6, 8, 2);
// add(8, 5, 3, 6, 7, 8, 9, 2);
//
// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');

//uso spread per sommare un array

// const x = [245, 876, 1256];
// add(...x);

// restaurant.orderDelivery({
//     time: '22:30',
//     address: 'Via del Sole, 21',
//     mainIndex: 2,
//     starterIndex: 2,
// })

// const {name, openingHours, categories} = restaurant;
// console.log(name, openingHours, categories);

// É identico al precedente ma possiamo dare il nome che desideriamo ai dati estratti
// Questo é importantissiimo quando elaboriamo delle api
// const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
// console.log(restaurantName, hours, tags);

// Lavorando con dati esterni é importante dare dei valori di default agli elementi importati
// Ad esempio, il valore 'menu' non esiste nell'array restaurante
// In questo caso userà il valore di default che glii assegniamo

// Default values
// const {menu = [], starterMenu: starters = []} = restaurant;
// console.log(menu, starters);

// Mutating variables
// let a = 111;
// let b = 999;
//
// const obj = {a: 23, b: 7, c: 14};
// {a, b } = obj;  // non funziona perchè quando ci sono le graffe il compilatore si aspetta del codice
// ({a, b} = obj); // questa funziona!!!! Wrappare con parentesi

// nested objects

// const {fri: {open: o, close: c},} = openingHours; // assegnamo anche un nome ai dati ottenuti
// console.log(o, c);

// const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
//potremmo iterare con un for ma...
// for of loop - simile al foreach in php
// for (const item of menu) {
//     console.log(item)
// }
// non restituisce gli indici

// se desidero gli indici
// for (const item of menu.entries()) {
//     console.log(item);
// }
//entries é un nuovo array che contiene indice e valore. Per cui posso usare destructuring per fare un elenco indicizzato
// for (const [i, e] of menu.entries()) {
//     console.log(`${i + 1}: ${e}`);
// }

// // DESTRUCTURING ARRAY
//
// let [main, secondary] = restaurant.categories;
// console.log(main, secondary);
//
// //Switching variables
// // const temp = main;
// // main = secondary;
// // secondary = main;
//
// // The same!!
// [main, secondary] = [secondary, main]; // scambia i valori automaticamente
// console.log(main, secondary);
//
// //Receive 2 return values from a function
// const [starter, mainCourse] = restaurant.order(2, 0);
// console.log(starter, mainCourse);
//
// //nested destructuring
// const nested = [2, 4, [5, 6]];
// const [i, , [j, k]] = nested;
// console.log(i, j, k);
//
// // Default values
// // IMPORTANTE QUANDO USIAMO DATI IMPORTATI. Diamo dei valorii di defualt a ciò che importiamo
// const [p = 1, q = 1, r = 1] = [8, 9];
// console.log(p, q, r); // il terzo valore é letto dal default value


