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
const labelBalance = document.querySelector('.balance__value'); // Balance
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

//creo uno username che é l'insieme delle iniziali del nome completo (vedi esempio più sotto)
const createUsername = function (accs) {
    accs.forEach(function (acc) {
        acc.username = acc.owner
            .toLowerCase()
            .split(' ')
            .map(name => name[0]).join(''); // array function
    });
};
createUsername(accounts);

const updateUI = function (acc) {
    // Display movements
    displayMovements(acc.movements);

    // Display balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
}


// MOVEMENTS

const displayMovements = function (movements, sort = false) {
    containerMovements.innerHTML = '';

    // slice crea un nuovo array SENZA MODIIFICARE L'ORIGINALE
    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    movs.forEach(function (mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>`;
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
}

// SALDO
const calcDisplayBalance = function (acc) {
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0); // zero é il valore inziale di acc
    labelBalance.textContent = `${acc.balance} EUR`;
}

// IN - OUT - INTEREST


const calcDisplaySummary = function (acc) {
    const incomes = acc.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${incomes}€`;


    const out = acc.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}€`;

    const interest = acc.movements
        .filter(mov => mov > 0)
        .map(deposit => (deposit * acc.interestRate / 100))
        .filter((int, i, arr) => { // filtra le quote di interesse inferiori a 1 euro
            return int >= 1;
        })
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${interest}€`;
}

// Chaining Methods
// total deposit in Dollars

const eurToUsd = 1.1;
//PIPELINE
/*
const totalDepositUSD = movements
    .filter(mov => mov > 0)
    .map((mov, i, arr) => { // arr é utilizzato per il debug dell'array creato da map
        //console.log(arr); // debug
        return mov * eurToUsd;
    })
    .reduce((acc, mov) => acc + mov, 0);
//console.log(totalDepositUSD);

 */

// EVENT LISTENER

// LOGIN
let currentAccount; // definito fuori dall'eventListener perché ne avremo bisogno altrove.

btnLogin.addEventListener('click', function (e) { // e server solo per il preventDefault
    e.preventDefault(); // serve per fermare il default automatico del form

    currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) // ricorda questo modo di verificare se currentAccount exists (optional chaining)
    {
        // Display UI and message
        labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;

        // Clear input fields
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        // Update UI
        updateUI(currentAccount);


    }
});

btnTransfer.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
    console.log(amount, receiverAcc);

    inputTransferAmount.value = inputTransferTo.value = '';

    if (amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username) {
        console.log('Transfer valid');
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // Update UI
        updateUI(currentAccount);
    }
});

btnLoan.addEventListener('click', function (e) {
    e.preventDefault();

    const amount = Number(inputLoanAmount.value);

    if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
        // add loan as new movement
        currentAccount.movements.push(amount);

        // Update UI
        updateUI(currentAccount);
    }
    inputLoanAmount.value = '';
})

btnClose.addEventListener('click', function (e) {
    e.preventDefault();

    if ((inputCloseUsername.value === currentAccount.username) && (Number(inputClosePin.value) === currentAccount.pin)) {
        const index = accounts.findIndex(acc => acc.username === currentAccount.username);
        console.log(index);
        // Delete account
        accounts.splice(index, 1);

        //Hide UI
        containerApp.style.opacity = 0;
    }
    inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
// esempio di come funziona la creazione dello username con le iniziali del nome
 */
/*
const user = 'Steven Thomas Williams';
const username = user
    .toLowerCase()
    .split(' ')
    .map(nam =>[0]).join('');
console.log(username);
*/

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);


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


const setJulia1 = [3, 5, 2, 12, 7];
const setJulia2 = [9, 16, 6, 8, 3];
const setKate1 = [4, 1, 15, 8, 3];
const setKate2 = [10, 5, 6, 1, 4];

 */
/*
let checkDogs = function (set1, set2) {
    let juliaDogs = set1.slice(1, 5);
    let juliaDogsDef = juliaDogs.slice(0, 2);
    // con splice

    // juliaDogs.splice();
    // juliaDogsDef.splice(0,1); // elimina il primo
    // juliaDogsDef.splice(-2); // elimina gli ultimi 2

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
*/

// =============================
//  MAP
// =============================

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//     return mov * eurToUsd;
// })

const movementsUSD = movements.map((mov) => {
    return mov * eurToUsd;
})

console.log(movements);
console.log(movementsUSD);

const movementsDescriptions = movements.map((mov, i) =>
    `Movement ${i + 1}: You deposited ${mov > 0 ? 'deposited' : 'withdrew'}${Math.abs(mov)}`

);

console.log(movementsDescriptions);
*/

// Maximum value using reduce

/*
const max = movements.reduce((acc, mov) => {
    if (acc > mov)
        return acc;
    else
        return mov;
}, movements[0]);
console.log(max);
*/

///////////////////////////////////////
// Coding Challenge #2

/*
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

//const data1 = [5, 2, 4, 1, 15, 8, 3]

// calcolo le dog age con MAP

// const humanges = data1.map(function (age) {
//     if (age > 2) {
//         return (age * 4) + 16 ;
//     } else {
//         return (age * 2)
//     }
// })

/*

my solution

const calcAverageHumanAge = function (ages) {
    const humanges = ages.map(age => age > 2 ? ((age * 4) + 16) : age * 2);
    console.log(humanges);
    const adultDogs = humanges.filter(age => age > 18);
    console.log(adultDogs);
    // return adultDogs.reduce((acc, ages) => acc + ages, 0) / (adultDogs.length);
    // alternativa per calcolare average
    return adultDogs.reduce((acc, ages, i, arr) => acc + ages/arr.length, 0); // arr é l'array elaborato da reduce

}
console.log(calcAverageHumanAge(data1));
*/

///////////////////////////////////////
// Coding Challenge #3

/*
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const calcDisplayBalance = function (movements) {
//     const balance = movements.reduce((acc, mov) => acc + mov, 0);
/*
const calcAverageHumanAge = ages => ages
        .map(age => age > 2 ? ((age * 4) + 16) : age * 2)
        .filter(age => age > 18)
        .reduce((acc, ages, i, arr) => acc + ages/arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));  // ricorda le quadre
*/

// FIND
//restituisce il primo valore che soddisfa la condizione
/*
const firstWithdrawal = movements.find( mov => mov < 0);
console.log(firstWithdrawal);

// esempio che legge in un array

const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

 */

// includes
/*
test if in array is a value
 */

// console.log(movements);
// console.log(movements.includes(-130)); // equality ===

// some
/*restituisce true se trova risultati che soddisfano una condizione
 */

// const anyDeposits = movements.some(mov => mov > 0); // condition
// console.log(anyDeposits);

// every
/*
true se tutti gli elementi soddisfano la condizione
 */

//console.log(movements.every(mov => mov > 0)); // true for account4

//separate callback
//==========================================
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));
// =========================================


// FLAT MAP (non funziona sui browser vecchi

const arr = [[1, 2, 3], [4, 5, 6], 7, 8]; // nested array
//console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
//console.log(arrDeep.flat()); // unisce solo al primo livello di profondità
//console.log(arrDeep.flat(2)); // unisce anche il secondo livello

/* immaginiamo di voler calcolare la somma di tutti i movimenti di tutti gli accounts
 */

// const accountMovements = accounts.map(acc => acc.movements); // ottengo una matrice con tutti i movimenti
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov,0);
// console.log(overallBalance);

// lo stesso chained

//flat
const overallBalance = accounts
    .map(acc => acc.movements)
    .flat()
    .reduce((acc, mov) => acc + mov, 0);
//console.log(overallBalance);

// flatMap - combina flat con map - solo 1 level deep
const overallBalance2 = accounts
    .flatMap(acc => acc.movements)
    .reduce((acc, mov) => acc + mov, 0);
//console.log(overallBalance2);

// sorting arrays

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners);
// console.log(owners.sort()); // ATTENZIONE: CAMBIA L'ORDINE NELL'ARRAY ORIGINALE
// console.log(owners); // ORDINE CAMBIATO

//>>>>>>>>>>>>>>>> sort funziona solo con le stringhe

// Numbers
//console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

//ascending
// movements.sort((a, b) => {
//     if (a > b) return 1;
//     if (b > a) return -1;
// });
//equivalente al superiore
movements.sort((a, b) => a - b); //restituisce 1 o -1
//console.log(movements);
//descending
// movements.sort((a, b) => {
//     if (a > b) return -1;
//     if (b > a) return 1;
// });
movements.sort((a, b) => b - a); //restituisce 1 o -1
//console.log(movements);


// FILL ARRAY

const x = new Array(7); // crea un array con sette elementi vuoti
x.fill(1); // riempie tutti gli elementi con 1
x.fill(1, 3); // riempi con 1 a partire da index 3 (0, 1, 2, 3...)
x.fill(1, 3, 5); // riempi con 1 a partire da index 3 e fino a index 5 incluso

const arra = [1, 2, 3, 4, 5, 6, 7];
arra.fill(23, 2, 6); //sostituisce con 23 solo tra gli indici
//console.log(arra);

// Array.from
/*
Array é una funzione di js, la stessa che si utilizza quando si scrive ->  const z = new Array()
 */

const y = Array.from({length: 7}, () => 1); // crea array lungo 7 con valori 1
//console.log(y);

const z = Array.from({length: 7}, (_, i) => i + 1); //lungo 7 e con sequenza. _ é usato come convenzione
//console.log(z);

// creo un nuovo Array con tutti i movimenti (cifre senza segno €)
labelBalance.addEventListener('click', function () {
    const movementsUI = Array.from(document.querySelectorAll('.movements__value'),
        el => Number(el.textContent.replace('€', '')));
    //console.log(movementsUI);
})

///////////////////////////////////////////////////////////////////////////////////////////
// Array Methods Practice

// 1. sum of total deposit
const bankDepositSum = accounts
    .flatMap(acc => acc.movements)
    .filter(mov => mov > 0)
    .reduce((sum, cur) => sum + cur, 0);

//console.log(bankDepositSum);

// 2. how many deposits > 1000
// NOT using reduce
/*
const numDeposits1000 = accounts
    .flatMap(acc => acc.movements)
    .filter(mov => mov >= 1000).length;
 */
// USING reduce (best)
/*
const numDeposits1000 = accounts
    .flatMap(acc => acc.movements)
    .reduce((count, cur) => (cur >= 1000 ? ++count : count), 0); // ++prima di count !!
console.log(numDeposits1000);

// 3. create an object with reduce
const {deposits, withdrawals} = accounts
    .flatMap(acc => acc.movements).reduce((sums, cur) => {
        //cur > 0 ? sums.deposits += cur : sums.withdrawals += cur;
        sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur; // same as before but simpler
        return sums;
    }, {deposits: 0, withdrawals: 0});
console.log(deposits, withdrawals);

// 4.  convert string in Title case
//this is a nice title -> This Is A Nice Title

const convertTitleCase = function (title) {

    const exceptions = ['a', 'an', 'the', 'but', 'or', 'on', 'in', 'with'];

    return title.toLowerCase().split(' ').map(word =>
        exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1));
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LOMG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));
*/

///////////////////////////////////////
// Coding Challenge #4

/*
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range
--> 10% above and
--> 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

const dogs = [
    {weight: 22, curFood: 250, owners: ['Alice', 'Bob']},
    {weight: 8, curFood: 200, owners: ['Matilda']},
    {weight: 13, curFood: 275, owners: ['Sarah', 'John']},
    {weight: 32, curFood: 340, owners: ['Michael']}
];

// 1. Loop over the dog's array and for each dog calculate recommended portion and add it to the object as a new property.
/*
recommendedFood = weight ** 0.75 * 28 (grams of food) (weight in Kg)
 */

dogs.forEach(dog => (dog.recFood = Math.trunc(dog.weight ** 0.75 * 28)));

//2. Find Sarah's dog and log to the console whether it's eating too much or too little.

const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));

console.log(`Sarah's dog is eating too ${dogSarah.curFood > dogSarah.recFood ? 'much' : 'little'}`)


let ownersEatTooMuch = dogs
    .filter(dog => dog.curFood > dog.recFood)
    .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);

let ownersEatTooLittle = dogs
    .filter(dog => dog.curFood < dog.recFood)
    .flatMap(dog => dog.owners);
console.log(ownersEatTooLittle);



    console.log(`${ownersEatTooMuch.join(' and ')} dogs eat too much!`);
    console.log(`${ownersEatTooLittle.join(' and ')} dogs eat too little!`);
    console.log('----------------------------------');

    // 5.
console.log(dogs.some(dog => dog.curFood === dog.recFood));

//6.

const checkEatingOkay = dog => dog.curFood > dog.recFood * 0.9 && dog.curFood < dog.recFood * 1.1

console.log(dogs.some( checkEatingOkay ));

// 7.

console.log(dogs.filter(checkEatingOkay));

// 8.

const dogsSorted = dogs.slice().sort((a,b) => a.recFood - b.recFood);

console.log(dogsSorted);













