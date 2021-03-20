'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


// sviluppo Bankist


const displayMovements = function (movements) {
    containerMovements.innerHTML = '';
    movements.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
    `;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
}

displayMovements(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
// metodi in array
// ricorda che gli array sono oggetti e che ereditano tutti i metodi degli oggetti prototype

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE

// -> consente di ottenere una parte dell'array a partire da ...

console.log(arr.slice(2));

// slice -> oppure restituisce risultati in un range: L' indice zero-base indica dove finisce l'intervallo da selezionare.
// slice seleziona gli elementi fino a quell'indice ma non l'elemento all'indice end.

console.log(arr.slice(1,5); // 'b', 'c', 'd', 'e'

console.log(arr.slice(2, 4)); // 'c', 'd'

//per iniziare lo slice dal termine dell'array
console.log(arr.slice(-2)); // 'd', 'e'

//l'unione delle due possibilità (non l'elemento dell'indice finale)
console.log(arr.slice(1, -2)); // 'b', 'c'

console.log(arr.slice()); //tutto l'array
console.log([...arr]); // tutto l'array (spread operator)

// SPLICE
// divide letteralmente l'array
// non é usato molto se non per cancellare, ad esempio, l'ultimo elemento di un array

console.log(arr.splice(2)); //["c", "d", "e"]
console.log(arr); // ["a", "b"]
arr.splice(-1); // cancella l'ultimo elemento
console.log(arr); // 'a'

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['d', 'e', 'p', 'x', 'q'];
console.log(arr2.reverse()); // cambia l'array originale

// CONCAT

const letters = arr.concat(arr2);
console.log(letters);
//equivalente
console.log([...arr, ...arr2]);

//JOIN
//unisce in una singola stringa l'array
console.log(letters.join(' - '));


// LOOPING ARRAYS

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
}

// equivalente al 100%

movements.forEach(function(movement){
  if (movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
})

// con il numero di operazione con for of

for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movements ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}
// con il numero di operazione con foreach

movements.forEach(function(mov, i , arr){
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movements ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
})

//foreach NON é controllabile con break / continue. Se necessari utilizzare l'altro metodo


//MAPS & SETS

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
})

//SETS
// gli array creati con set non hanno keys

const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, key, map) {
    console.log(`${key}: ${value}`);
});
*/


///////////////////////////////////////
// Coding Challenge #1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const setJulia1 = [3, 5, 2, 12, 7];
const setJulia2 = [9, 16, 6, 8, 3];
const setKate1 = [4, 1, 15, 8, 3];
const setKate2 = [10, 5, 6, 1, 4];

let checkDogs = function (set1, set2) {
    let juliaDogs = set1.slice(1, 5);
    let juliaDogsDef = juliaDogs.slice(0, 2);
    // con splice
    /*
    juliaDogs.splice();
    juliaDogsDef.splice(0,1); // elimina il primo
    juliaDogsDef.splice(-2); // elimina gli ultimi 2
    */
    let dogs = juliaDogsDef.concat(setKate1);


    dogs.forEach(function (value, key, map) {
            if (value > 2) {
                console.log(`Dog number ${key + 1} is an adult.`)
            } else {
                console.log(`Dog number ${key + 1} is a puppy.`)
            }
        }
    )
}

checkDogs(setJulia2, setKate2);



