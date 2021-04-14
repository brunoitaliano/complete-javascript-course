'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');


///////////////////////////////////////

const renderCountry = function(data, className = '') {
  const html = `
  <article class='country ${className}'>
          <img class='country__img' src='${data.flag}' />
          <div class='country__data'>
            <h3 class='country__name'>${data.name}</h3>
            <h4 class='country__region'>${data.region}</h4>
            <p class='country__row'><span>👫</span>POP ${(+data.population / 1000000).toFixed(1)} people </p>
            <p class='country__row'><span>🗣️</span>${data.languages[0].name}</p>
            <p class='country__row'><span>💰</span>${data.currencies[0].name}</p>
          </div>
        </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;

};

const renderError = function(msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

/*
/////////////////////////////////////////////////////
// Our first AJAX Call: XMLHttpRequest

// AJAX call countru 1
const getCountryAndNeighbour = function(country) {

  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();


  request.addEventListener('load', function() {

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render Country
    renderCountry(data);

    // Get neighbour Country 2
    const [neighbour] = data.borders; // always the first element

    if (!neighbour) return;

    // AJAX call Country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function() {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('portugal');
*/

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// request.send();

//Promise
//Un oggetto usato come plaholder per il futuro risultato di una operazione asyncrona
//oppure: un container per un valore restituito in modo asymcrono

// const request = fetch('https://restcountries.eu/rest/v2/name/portugal'); // genera un Promise
// console.log(request);

// const getCountrydata = function(country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`) // restituisce una promise
//     .then(function(response) { // then gestisce la promise
//     return response.json(); // response.json restituisce un'altra promise. NOTA l'uso di return, per risolvere la Promies generata da json()
//   }).then(function(data) { // then gestisce la seconda promise
//     renderCountry(data[0]); // uso i dati
//   })
// };

// trasformata con Arrow function

const getJSON = function(url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok)
      throw new Error(`${errorMsg} (${response.status})`); // throw respinge immediatamente la promise
    return response.json(); // response.json restituisce un'altra promise
  });
};


// la prossima getCountrydata é la versione estesa, che non utilizza l'utility function getJSON qui sopra.
// Più sotto c'è la funzione aggiornata

/*
const getCountrydata = function(country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`) // restituisce una promise
    .then(response => {
      console.log(response);
      console.log(`Ok value: ${response.ok}`); // per studio mio
      console.log(`Status value: ${response.status}`); // per studio mio: questo é il codice dello status (200, 404 ecc.)
      if(!response.ok)
        throw new Error(`Country not found (${response.status})`) // throw respinge immediatamente la promise. Throw Return immediatamente! Promise is rejected
      return response.json(); // response.json restituisce un'altra promise
    })
    .then(data => {
      renderCountry(data[0]);
        const neighbour = data[0].borders[0]
      console.log(`This is the Neighbour:  ${neighbour}`);
      if(!neighbour) return;

      //Country 2
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    .then(response => {
      console.log(`neighbour ${response}`);
      console.log(`Ok value neighbour: ${response.ok}`); // per studio mio
      console.log(`Status value neighbour: ${response.status}`); // per studio mio: questo é il codice dello status (200, 404 ecc.)
      if (!response.ok) {
        throw new Error(`Country not found ${response.status}`)
      };
      return response.json()
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => { // essendo tutto chained questo raccoglie tutti gli errori.Raccoglie la Promise rejected con Throw
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`); // raccoglie gli errori di tutta la chain
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
btn.addEventListener('click', function() {
  getCountrydata('island')
});

 */

/*
const getCountrydata = function(country) {
  // Country 1
  getJSON(`https://restcountries.eu/rest/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) throw new Error('No neighbour found!'); //promise bloccata e invia errore a catch

      //Country 2
      return getJSON(`https://restcountries.eu/rest/v2/alpha/${neighbour}`, 'Country not found');
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.log(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥💥 ${err.message} Try again!`); // raccoglie gli errori di tutta la chain
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
 btn.addEventListener('click', function() {
   getCountrydata('portugal');
 });

getCountrydata('australia');

/*
///////////////////////////////////////////////////////////////////////////
// Microtasks priority

console.log('Test start'); // ordine di esecusione: 1
setTimeout(() => console.log('0 sec timer'), 0); // WEB API - ordine di esecuzione 4
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // ordine di esecuzione: 3 (perchè in microtasks)
console.log('Test end'); // ordine di esecuzione: 2

// In questo casso setTimeout non serve se non al termine di tutto lo stack
// Se serve che promise utilizzi un timer la soluzione potrebbe essere, ma in realtà vedi sotto la possibilit`di incapsulare la Promise nel setTimeout

Promise.resolve('Resolved promise 2').then (res => {
  for (let i = 0; i < 10000000000; i++) {};
  console.log(res);
});
console.log('Test2 end ');
//Promise server anche per disporre di un timer preciso per regolare l'esecuzione delle funzioni.

*/
///////////////////////////////////////////////////////////////////////////////////////////////
// Lecture 255 - Build Promises from scratch

//Promise é la "execution function" e determina la asicronicità della funzione
// Pattern tipico
/*
const lotteryPromise = new Promise(function(resolve, reject) {

  console.log('Lottery draw is happening 🔮');
  // in questo modo uso il setTimeout per rendere asincrona la funzione
  setTimeout(function() {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰'); // fulfilled promise cioè risolta. Gli argomenti sono equivalenti al .then -> res
    } else {
      reject(new Error('You lost your money 💩')); // err, intercettata da catch
    }
  }, 2000);
});

// Consuming Promise
lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

//-------------------------------------------------------------------------------

// Promisifyng setTimeout
const wait = function(seconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};
// Consume...
wait(2).then(() => {
  console.log('I waited 2 seconds'); // esecuzione 1
  return wait(1);
}).then(() => console.log('I waited 1 second')); // esecuzione 2



// esecuzione - equivalente della serie di Timeouts innestati
wait(1).then(() => {
  console.log('1 seconds'); // esecuzione 1
  return wait(1);
})
  .then(() => {
    console.log('2 seconds'); // esecuzione 1
    return wait(1);
  })
.then(() => {
    console.log('3 seconds'); // esecuzione 1
    return wait(1);
  })
.then(() => {
    console.log('4 seconds'); // esecuzione 1
    return wait(1);
  });

// Creazione fullfilled 0 rejected promise directly

Promise.resolve('abc').then(x => console.log(x)); // resolve immediately
Promise.reject(new Error('Problem!')).catch(x => console.error(x)); // reject immediately - ricorda che Error é un metodo di JS
*/

////////////////////////////////////////////////////////////////////////////
// Lecture 256 - Geolocation API

/*
Uso di Geolocation base
navigator.geolocation.getCurrentPosition(
  position => console.log(position),
  err => console.error(err)
);
console.log('Getting position'); // happen first
 */
/*
// uso con Promise
const getPosition = function() {
  return new Promise(function(resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject (err)
    // );
    // La stessa ma più semplice
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
 getPosition().then(pos => console.log(`Position: ${pos}`));


const whereAmI = function() {
  getPosition()
    .then(pos => {
    const { latitude: lat, longitude: lng } = pos.coords;
    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  })
    .then(res => {
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message} 💥`));
};

btn.addEventListener('click', whereAmI);
*/
///////////////////////////////////////////////////
// Lecture 258 - Async

// getPosition é solo per consuming Promise
const getPosition = function() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};


//it's not blocking the mainthread of the execution!!!

const whereAmI = async function(country) {
  try {// Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    // Reverse Geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if(!resGeo.ok) throw new Error ('Problem getting location data');
    const dataGeo = await resGeo.json();
    // Country data
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${dataGeo.country}`);
    if(!resGeo.ok) throw new Error ('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);
    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch(err) {
    console.log(`${err} 💥💥💥`);
    renderError(` 💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};
console.log('1: Will get location');  //1
// const city = whereAmI();
// console.log(city); // 2, ma solo la Promise in pending
// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.error(`2: ${err.message} 💥`)) // 3 Promise resolved or rejected se l'ultimo log é fuori da promise
//   .finally(() => console.log('3: Finished getting location')); //  3 se voglio che venga eseguita dopo Promise
// console.log('3: Finished getting location'); // 2 se fuori da promise

//equivalente ma con IFEE e async
(async function f() {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`)
  }
  console.log('3 async: Finished getting location');
})();
