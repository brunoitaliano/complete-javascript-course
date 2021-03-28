'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
    btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);
    // per capire...
    console.log(e.target.getBoundingClientRect()); // restituisce tutte le coordinate dell'elemento al momento del click
    console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);
    // 0 0 se non c'è scroll. Se e é al Top X é la distanza che ha percorso da 0 0

    console.log('height/width viewport',
        document.documentElement.clientHeight,
        document.documentElement.clientWidth);

// Scrolling
//     window.scrollTo(s1coords.left + window.pageXOffset,
//         s1coords.top + window.pageYOffset);


    // OLD SCHOOL !!!!!!!!!!!!!!!
    // window.scrollTo({
    //     left: s1coords.left + window.pageXOffset,
    //     top: s1coords.top + window.pageYOffset,
    //     behavior: 'smooth',
    // });

    // MODERN BROWSER
    section1.scrollIntoView({behavior: 'smooth'});


});


/////////////////////////////////////////////////////////
// LECTURES

// Selecting elements

// selezionare l'intero documento
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header'); // the first element
const allSections = document.querySelectorAll('.section'); // all elements
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

document.getElementsByClassName('btn');

// Creating and inserting elements
// .insertingAdjacentHTML - vedi Section 12

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use ccokies for improved functionality and analitycs';
message.innerHTML = 'We use cokies for improved functionality and analitycs <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message); // add as first child of element
header.append(message); // add as last child !!! ONCE so the previous is not printed
// so append or prepend is used also for moving objects!!! The last one is the viewed one

// if we want copy the element
// header.append(message.cloneNode(true)); // now we have 2 messages

//header.before(message); //as sibling once
//header.after(message); // once

// Delete elements
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
    message.remove();
});

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.height); // NON restituisce nulla perchè restituisce solo per gli online styles
console.log(message.style.backgroundColor); // OK

//console.log(getComputedStyle(message)); // OK!!! ma restituisce tutto
console.log(getComputedStyle(message).color); // OK!!! restituisce solo color
//console.log(getComputedStyle(message).height); // OK!!! ma restituisce una STRINGA

//proviamo a cambiare l'height di message
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 50 + 'px';

// set property
document.documentElement.style.setProperty('--color-primary', 'orangered'); // a livello root -> document

// attributes

const logo = document.querySelector('.nav__logo');
//standard attributes
console.log(logo.alt);
console.log(logo.src); // absolute url - for relative use getAttributes
console.log(logo.className);

//setting
logo.alt = 'Beautiful minimalist logo';

// Non-standard attributes
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

console.log(logo.getAttribute('src')); // relative url

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // absolute
console.log(link.getAttribute('href')); // relative

//Data attributes

console.log(logo.dataset.versionNumber); // studia bene!!! corrisponde all'attributo data-version-number

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

// DON'T USE
//logo.className = 'jonas'; // eliminates all other classes

//EVENTS
const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e){
//     alert('Great!');  // simile a hover
// });

//equivalente a (OLD SCHOOL)
// h1.onmouseenter = function (e) {
//     alert('Great!');
// }

// possibile anche tenere separata la funzione. MIGLIORE!!! Alert riusabile

const alertH1 = function (e){
    alert('Great!');
    h1.removeEventListener('mouseenter', alertH1); // singleton
}

h1.addEventListener('mouseenter', alertH1);

// rimuovere eventListener
// per esempio con timeout

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); // rimuove dopo 3 sec.




////////////////////////////////////////////////////////////////////////


