'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

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


// button scrolling

btnScrollTo.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect();
    //   console.log(s1coords);
    // per capire...
    //  console.log(e.target.getBoundingClientRect()); // restituisce tutte le coordinate dell'elemento al momento del click
    //   console.log('Current scroll (X/Y)', window.pageXOffset, pageYOffset);
    // 0 0 se non c'è scroll. Se e é al Top X é la distanza che ha percorso da 0 0

    //  console.log('height/width viewport',
    //       document.documentElement.clientHeight,
    //       document.documentElement.clientWidth);

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

// Page navigation
/*
creo la navigazione smooth dal menu alle sezioni
 */

// document.querySelectorAll('.nav__link').forEach(function (el) {
//     el.addEventListener('click', function (e){
//         e.preventDefault();
//         const id = this.getAttribute('href');
//         document.querySelector(id).scrollIntoView({
//             behavior: 'smooth'
//         });
//         console.log(id);
//     });
// });

// Event delegation
// 1. add event listener to common element (.nav__links)
// 2. determine what element originated the event (e.target)

document.querySelector('.nav__links').addEventListener('click', function (e) {
    //console.log(e.target); //what element originated the event
    //Matching strategy, per individuare solo i link nav__link
    if (e.target.classList.contains('nav__link')) {
        e.preventDefault();
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth'
        });
    }
});

// tabbed component


// tabs.forEach(t => t.addEventListener('click', () =>
// console.log('TAB'))); // funziona ma meglio -> event delegation
//Event delegation
tabsContainer.addEventListener('click', function (e) {
    //closest é necessario per consentire di cliccare sia sul testo, sia sul numero o sul bottone
    const clicked = e.target.closest('.operations__tab');
    // Guard clause
    if (!clicked) return; // serve per evitare che lo script venga eseguito anche su null

    // prima rimuovo le classi di attivazione dai buttons e dai contenuti
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    // aggiungo la classe che fa salire il button
    clicked.classList.add('operations__tab--active');

    //active content area
    //ho già rimosso poco sopra la classe attivante
    document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})

// Menu fade animation

const handleMover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const sibling = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        sibling.forEach(el => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
}
// così funziona...
nav.addEventListener('mouseover', function (e) {
    handleMover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
    handleMover(e, 1)
});

//ma !! bind

//Passing "arguments" into handler
nav.addEventListener('mouseover', handleMover.bind(0.5));
nav.addEventListener('mouseout', handleMover.bind(1));
/*
In pratica: bind passa in automatico l'evento e - Aggiungo il valore di opacity che assumerà il nome this nell'handler
 */

//Sticky navigation
/*
scroll event é attaccato a window e non a document

questo funziona ma window.scrollY é poco efficente
vedi sott l'implementazione con Intersection API
 */

// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);
// window.addEventListener('scroll', function () {
//     console.log(window.scrollY);
//     if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//     else nav.classList.remove('sticky');
// });

//Sticky navigation: Intersection API
/*
vedi la descrizione: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
 */

const obsCallback = function (entries, observer) {
    /*
    ogni qualvolta l'oggetto osservato (section1 qui) intercetta il riferimento ( viewport  se root:null)
    come é definito in obsOptions, viene invocata questa funzione!
     */
    entries.forEach(entry => {
        //console.log(entry);
    })
};
// queste sono le opzioni di IntersectionObserver
// const obsOptions = {
//     root: null, // null se il riferimento é il Viewport
//     threshold: [0, 0.1] // 1.0 significa che il 100% del target é visibile in root. In questo caso é il 10%
// };
// const observer = new IntersectionObserver(obsCallback, obsOptions); // (callback, options)
// observer.observe(section1);

document.addEventListener('DOMContentLoaded', function (e){
    console.log('HTML parsed and DOM tree built!', e); // quando é caricato il DOM
});

window.addEventListener('load', function (e) {
    console.log('page fully loaded!', e); // al termine del caricamento
});

// window.addEventListener('beforeunload', function (e) {
//     e.preventDefault(); // non appena l'utente vuole lasciare la pagina (ma funziona solo se l'utente a usato anche poco la pagina!!!)
//     console.log(e);
//     e.returnValue = ''; // da mettere per ragioni tecniche - non é customizzabile con un messaggio proprio...
// }); // da utilizzare solo nel caso si tratti di un form, di un checkout o qualcosa nella quale avvisare l'utente é importante.



const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height; // calcola l'altezza del nav superiore
//console.log(navHeight);

const stickyNav = function (entries) {
    const [entry] = entries; // desctructuring
    // console.log(entry);
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0, // cioé quando .header esce dal viewport
    rootMargin: `-${navHeight}px`, // il margine superiore dove viene chiamata callback
});
headerObserver.observe(header);

//Reveal Sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
    const [entry] = entries; // destructuring
    //console.log(entry);

    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target); // solo una volta....
}

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
})
allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// Lazy load images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
    const [entry] = entries;


    if (!entry.isIntersecting) return;

    //Replace src with data-src
    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img');
    });

    observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

const slider = function () {


// SLIDER
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const slider = document.querySelector('.slider');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;

// slider.style.transform = 'scale(0.3) translateX(-1000px)';
// slider.style.overflow = 'visible';

    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML('beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    };

    const activateDot = function (slide) {
        document
            .querySelectorAll('.dots__dot')
            .forEach(dot => dot.classList.remove('dots__dot--active'));
        document
            .querySelector(`.dots__dot[data-slide="${slide}"]`)
            .classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
    }
    goToSlide(0);

//Next slide

    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }
        goToSlide(curSlide);
        // curSlide = 1: -100%, 0%, 100%, 200%
        activateDot(curSlide);
    };

    const prevSlide = () => {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    }

    const init = function () {
        goToSlide(0);
        createDots();
        activateDot(0);
    };
    init();

// Event handler
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === "ArrowLeft") prevSlide();
        e.key === 'ArrowRight' && nextSlide();//lo stesso con short circuiting
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const {slide} = e.target.dataset; //destructuring
            goToSlide(slide);
            activateDot(slide);

        }
    });
};
slider();


/////////////////////////////////////////////////////////
// LECTURES

// Selecting elements

// selezionare l'intero documento
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

//const header = document.querySelector('.header'); // the first element
//const allSections = document.querySelectorAll('.section'); // all elements
//console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
//console.log(allButtons);

document.getElementsByClassName('btn');

// Creating and inserting elements
// .insertingAdjacentHTML - vedi Section 12

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use ccokies for improved functionality and analitycs';
message.innerHTML = 'We use cokies for improved functionality and analitycs <button class="btn btn--close-cookie">Got it!</button>';
// header.prepend(message); // add as first child of element
//header.append(message); // add as last child !!! ONCE so the previous is not printed
// so append or prepend is used also for moving objects!!! The last one is the viewed one

// if we want copy the element
// header.append(message.cloneNode(true)); // now we have 2 messages

//header.before(message); //as sibling once
//header.after(message); // once

// Delete elements
//document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//    message.remove();
//});

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

//console.log(message.style.height); // NON restituisce nulla perchè restituisce solo per gli online styles
//console.log(message.style.backgroundColor); // OK

//console.log(getComputedStyle(message)); // OK!!! ma restituisce tutto
//console.log(getComputedStyle(message).color); // OK!!! restituisce solo color
//console.log(getComputedStyle(message).height); // OK!!! ma restituisce una STRINGA

//proviamo a cambiare l'height di message
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 50 + 'px';

// set property
document.documentElement.style.setProperty('--color-primary', 'orangered'); // a livello root -> document

// attributes

const logo = document.querySelector('.nav__logo');
//standard attributes
//console.log(logo.alt);
//console.log(logo.src); // absolute url - for relative use getAttributes
//console.log(logo.className);

//setting
logo.alt = 'Beautiful minimalist logo';

// Non-standard attributes
//console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

//console.log(logo.getAttribute('src')); // relative url

const link = document.querySelector('.nav__link--btn');
//console.log(link.href); // absolute
//console.log(link.getAttribute('href')); // relative

//Data attributes

//console.log(logo.dataset.versionNumber); // studia bene!!! corrisponde all'attributo data-version-number

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');

// DON'T USE
//logo.className = 'jonas'; // eliminates all other classes

//EVENTS
//const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function (e){
//     alert('Great!');  // simile a hover
// });

//equivalente a (OLD SCHOOL)
// h1.onmouseenter = function (e) {
//     alert('Great!');
// }

// possibile anche tenere separata la funzione. MIGLIORE!!! Alert riusabile

// const alertH1 = function (e){
//     alert('Great!');
//     h1.removeEventListener('mouseenter', alertH1); // singleton
// }

//h1.addEventListener('mouseenter', alertH1);

// rimuovere eventListener
// per esempio con timeout

//setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000); // rimuove dopo 3 sec.
////////////////////////////////////////////////////////////////////////

// Bubbling & Propagate

// rgb(255,255,255)

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
//console.log(randomColor(0, 255));

document.querySelector('.nav__link').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor();
    //se volessi fermare la propagazione
    //e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor(); //propagate to all menu elements
});
document.querySelector('.nav').addEventListener('click', function (e) {
    this.style.backgroundColor = randomColor(); // propagate to nav element
});

// DOM TRAVERSING

//const h1 = document.querySelector('h1');

// Going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes); // tutti gli elementi, testi compresi
// console.log(h1.children); // solo gli elementi html
// h1.firstElementChild.style.color = 'white'; // solo il primo child html
// h1.lastElementChild.style.color = 'red';

// Going upwards parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// l'elemento x più vicino nei parents
//h1.closest('.header').style.background = 'var(--gradient-secondary)';
//
//h1.closest('h1').style.background = 'var(--gradient-primary)';

// Going siblings
// console.log(h1.previousElementSibling); // html:  in questo caso é null
// console.log(h1.nextElementSibling); //html:  in questo caso é h4

// console.log(h1.previousSibling); //node
// console.log(h1.nextSibling);//node

//per ottenere l'elenco dei siblings prima andiamo a parents poi elenchiamo i sibligs
//console.log(h1.parentElement.children);

// esempio per modificare alcuni elementi tra i siblings
// [...h1.parentElement.children].forEach(function (el){
//     if (el !== h1) el.style.transform = 'scale(0.5)'; // tutti tranne h1
// });





