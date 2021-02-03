'use strict';

// Data needed for a later exercise
const flights =
    '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
    name: 'Classico Italiano',
    location: 'Via Angelo Tavanti 23, Firenze, Italy',
    categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
    starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    openingHours: {
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
    },

    order: function (starterIndex, mainIndex) {
        return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
    orderDelivery: function ({starterIndex = 1, mainIndex = 0, time = '20:00', address}) { // sono importanti i nomi degli argomenti, non l'ordine!!!!
        console.log(`Order received! ${this.starterMenu
            [starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
    },
    orderPasta: function (ing1, ing2, ing3) {
        console.log(`Here is your delicious pasta with ${ing1}, ${ing2}, ${ing3}`);
    },

    orderPizza: function (mainIngredient, ...otherIngredientes) { // separa il primo ingrediente dagli altri
        console.log(mainIngredient);
        console.log(otherIngredientes);
    },
};

// REST OPERATOR
// on left side of =
// opposto a SPREAD, riunisce i valori in un array
const [f, g, ...others] = [1, 2, 3, 4, 5];
console.log(f, g, others);


// 1) destructuring

// SPREAD OPERATOR
// on right side of =
// consente di aggiungere elementi ad un array
// ... (spread operator) unisce gli elementi presi singolarmente
// spread lavora sugli array ma anche su TUTTI gli iterable elements
// Iterables: array, strings, maps, sets.

//utilizzo rest e spread insieme

const [p, , r, ...otherFood] = [...restaurant.mainMenu, ...restaurant.starterMenu,]; // primo e terzo elemento
console.log(p, r, otherFood);

const arr = [7, 8, 9];
const newArr = [1, 2, ...arr];
console.log(newArr);
console.log(...newArr); // ottimo per passare gli argomenti ad una funzione

// proviamo ad aggiungere un nuovo piatto al menu

const newMenu = [...restaurant.mainMenu, 'Gnocchi']
console.log(newMenu);

// Copiamo un array con spread

const mainMenuCopy = [...restaurant.mainMenu];

//Uniamo 2 array: mainMenu e StarterMenu

const completeMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(...completeMenu);

// spread su stringhe

const str = 'Bruno';
const letters = [...str, ' ', 'I.'];
console.log(letters);

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

const newRestaurant = {...restaurant, founder: 'Giuseppe'};
console.log(newRestaurant);

//rest in objects

const {sat, ...weekdays} = restaurant.openingHours; // tengo fuori saturday da weekdays
console.log(weekdays);

// 2) Rest in Functions
// riceve valori e li colloca in array;
const add = function (...numbers) {
    let sum = 0;
    for(let i = 0; i < numbers.length; i++) {
        sum += numbers[i];
    };
        console.log(sum);
}
add(2, 3);
add(5, 3, 6, 8, 2);
add(8, 5, 3, 6, 7, 8, 9, 2);

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');

//uso spread per sommare un array

const x = [245, 876, 1256];
add(...x);

restaurant.orderDelivery({
    time: '22:30',
    address: 'Via del Sole, 21',
    mainIndex: 2,
    starterIndex: 2,
})

const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

// É identico al precedente ma possiamo dare il nome che desideriamo ai dati estratti
// Questo é importantissiimo quando elaboriamo delle api
const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
console.log(restaurantName, hours, tags);

// Lavorando con dati esterni é importante dare dei valori di default agli elementi importati
// Ad esempio, il valore 'menu' non esiste nell'array restaurante
// In questo caso userà il valore di default che glii assegniamo

// Default values
const {menu = [], starterMenu: starters = []} = restaurant;
console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;

const obj = {a: 23, b: 7, c: 14};
// {a, b } = obj;  // non funziona perchè quando ci sono le graffe il compilatore si aspetta del codice
({a, b} = obj); // questa funziona!!!! Wrappare con parentesi

// nested objects

const {fri: {open: o, close: c},} = openingHours; // assegnamo anche un nome ai dati ottenuti
console.log(o, c);

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


