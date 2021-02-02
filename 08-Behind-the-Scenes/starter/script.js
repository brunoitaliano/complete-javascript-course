 'use strict';
// console.log(this); // punta a window
//
// const calcAge = function (birthYear) {
//     console.log(2037 - birthYear);
//     console.log(this); // punta a undefined perchè la function non appartiene a Gloabl Scope
// };
// calcAge(1991);
//
// const calcAgeArrow = birthYear => {
//     console.log(2037 - birthYear);
//     console.log(this); // punta a window perchè le arrow function puntano allo scopo che le contengono
// };
// calcAgeArrow(1980);
//
// const jonas = {
//     year: 1991,
//     calcAge: function () {
//         console.log(this); //questo metodo sta dentro al block const, per cui this legge il blocco
//         console.log(2037 - this.year); //OK
//     }
// }
//
// jonas.calcAge();
//
// const matilda = {
//     year: 2017,
// };
//
// matilda.calcAge = jonas.calcAge; // copio il metodo di jonas !!! Infatti non ha le parentesi.
// matilda.calcAge(); // qui invece uso il metodo che ora appartiene anche a matilda
//
// const f = jonas.calcAge; // copio il petodo e lo assegno a f

 const jonas = {
     firstName: 'Jonas',
     year: 1991,
     calcAge: function () {
         console.log(this); //questo metodo sta dentro al block const, per cui this legge il blocco
         console.log(2037 - this.year); //OK

         // //soluzione 1
         // const self = this; //registra this in una variabile const nello scopo della funzione
         // const isMillenial = function () {
         //     console.log(self);
         //     console.log(self.year >= 1981 && self.year <= 1996);
         // };
         // soluzione 2
          const isMillenial = () => {  // this punta a jonas e non a calcAge !!!
             console.log(this);
             console.log(this.year >= 1981 && this.year <= 1996);
         };


         isMillenial(); // chiamare una funzione in un metodo punta this nel Global Scope!!! Usa self se utilizzi la soluzione 1
     },
     greet: () => console.log(`Hey ${this.firstName}`), // this.firstName restituisce undefined perchè nelle arrow function this punta a Global
 };

 jonas.greet();
 jonas.calcAge();

 const addExpr = function (a, b) { // in rea ltà si possono passare n argomenti facendo poi un loop per sommarli
     console.log(arguments);
     return a + b;
 }

 addExpr(2, 5, 6);