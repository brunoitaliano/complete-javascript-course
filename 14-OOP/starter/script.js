'use strict';
// OOP in JS
/*
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

// OLD SCHOOL!!!! vedi più sotto ES6

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

// STATIC METHOD
// non ereditati dalle istanze. legate alla classe e non alle istanze
Person.hey = function () {
    console.log('hey');
);
Person.hey(); // print hey

//
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
*/
//////////////////////////////////////////////////////////
// Coding Chanllenge #1

/*
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
*/
/////////////////////////////////////////////////////////////
// ES6

/*
// class expression
//const PersonCl = class {};

// class declaration (é l'equivalente di class expression)
class PersonCl {

    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    // il metodo creato qui va nel prototype dell'oggetto!
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    get age() {
        return 2037 - this.birthYear; // crea automaticamente la proprietà in prototype
    }

    // questo setter viene invocato automaticamente quando si chiama il contructor per validare il fullname
    set fullName(name) {
        if(name.includes(' ')) this._fullName = name; // l'underscore é posto per "convenzione' per evitare il conflitto con il constructor.
        else alert(`${name} is not a full name!`)
        // E' stata creata una nuova proprietà _fullName
        // Per ottenere il fullName si imposta un getter
    }

    get fullname() {
        return this._fullName; // necessario per ottenere fullname settato con il set
    }

    // Static method - PersonCl.hey() - available only for class and NOT for instances
    static hey() {
        console.log('hey');
    }
}
const jessica = new PersonCl('Jessica hans', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizes
// 3. Classes are executed in strict mode

// GETTER - SETTER

const account = {
    owner: 'Jonas',
    movements: [200, 300, 500, 350, 250],

    get latest() {
        return this.movements.slice(-1).pop(); // restituisce il valore estraendolo dall'array [250].pop()  -> 250
    },

    set latest(mov) {
        this.movements.push(mov);
    }




}
console.log(account.latest); // intercetta automaticamente il setter

account.latest = 50;
console.log(account.movements);
console.log(jessica.age);
*/

///////////////////////////////////////////////////
//   Object.create
/*
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 2001);
sarah.calcAge();
 */

////////////////////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

/*
const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;

};

Person.prototype.calcAge = function () {
    console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear); // call alla classe parent
    this.course = course;
};

// Linking prototypes !!! questa é l'esatta posizione, prima di immettere nuovi elementi in Student.prototype
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge(); // funziona solo se hai fatto il Linking prototypes!!!

//TESTS
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__); // Object Prototype

console.log(mike instanceof Student); // true
console.log(mike instanceof Person); // true
console.log(mike instanceof Object); // true


Student.prototype.constructor = Student;
console.log("Dopo la correzione");
console.log(mike.__proto__);
console.log(mike.__proto__.__proto__); // Object Prototype

 */

////////////////////////////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes
/*
class PersonCl {

    constructor(fullName, birthYear) {
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    // il metodo creato qui va nel prototype dell'oggetto!
    calcAge() {
        console.log(2037 - this.birthYear);
    }

    get age() {
        return 2037 - this.birthYear; // crea automaticamente la proprietà in prototype
    }

    // questo setter viene invocato automaticamente quando si chiama il contructor per validare il fullname
    set fullName(name) {
        if(name.includes(' ')) this._fullName = name; // l'underscore é posto per "convenzione' per evitare il conflitto con il constructor.
        else alert(`${name} is not a full name!`)
        // E' stata creata una nuova proprietà _fullName
        // Per ottenere il fullName si imposta un getter
    }

    get fullName() {
        return this._fullName; // necessario per ottenere fullname settato con il set
    }

    // Static method - PersonCl.hey() - available only for class and NOT for instances
    static hey() {
        console.log('hey');
    }
}

class StudentCl extends PersonCl{
    constructor(fullName, birthYear, course) {
        // Always needs to happen first
        super(fullName, birthYear);
        this.course = course;
    }
    introduce() {
        console.log(`My name is ${this.fullName} and I study ${this.course}`);
    }

// override method
    calcAge() {
        console.log(`I'm ${2037 - this.birthYear} years old, but as a student I fell more like ${2037 - this.birthYear + 10}`);
    }

};

const martha = new StudentCl('Matha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();
*/
//////////////////////////////////////////////////////////////////

// Inheritance Betweeen "Classes": Object.create
// Per alcuni questa é la tecnica migliore perchè non crea "fake classes".
// Di fatto le ES6 classes sono le pi`¨usate
/*
const PersonProto = {
    calcAge() {
        console.log(2037 - this.birthYear);
    },

    init(firstName, birthYear) {
        this.firstName = firstName;
        this.birthYear = birthYear;
    },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
};

StudentProto.introduce = function () {
    console.log(`My name is ${this.firstName} and I study ${this.course}`);
}
const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();
*/

/////////////////////////////////////////////////////
// PRIVATE CLASS FIELDS
// 2021 04 - ancora supportato solo da Chrome
// non completato... vedi nel file final e torna quando sarà utilizzabile

// Public fields
// Private fields
// Public methods
// Private methods
/*
class Account {
    //Public fields (instances)
    locale = navigator.language;

    // Private fields
    #movements = [];


    constructor(owner, currency, pin) {
        this.owner = owner;
        this.currency = currency;
        // protected property
        this._pin = pin;
        // this._movements = []; // non é negli argomenti ma si può creare la proprietà qui
        // this.local = navigator.language;

        console.log(`Thanks for openin an account, ${owner}`);
    }

    // Public Interface
    getMovements() {
        return this.#movements;
    }

    deposit(val) {
        this.#movements.push(val);
    }
    withdraw(val) {
        this.deposit(-val);
    }
    _approveLoan(val){
        return true;
    }

    requestLoan(val) {
        if(this._approveLoan(val)) {
            this.deposit(val);
            console.log(`Loan approved`);
        }
    }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

acc1.deposit(250);
acc1.withdraw(140);

acc1.requestLoan(1000);
acc1._approveLoan(1000); // non ha senso...
console.log(acc1.getMovements());

console.log(acc1);
//console.log(acc1.#movements); // Not permitted
*/



