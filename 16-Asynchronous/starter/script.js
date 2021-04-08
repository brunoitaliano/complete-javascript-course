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

};

const renderError = function(msg) {
  countriesContainer.insertAdjacentHTML('beforeend', msg);

};

/*
/////////////////////////////////////////////////////
// Our first AJAX Call: XMLHttpRequest

// AJAX call entry 1
const getCountryAndNeighbour = function(country) {

  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();


  request.addEventListener('load', function() {

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render Country
    renderCountry(data);

    // Get neighbour Country
    const [neighbour] = data.borders;

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

// const request = fetch('https://restcountries.eu/rest/v2/name/portugal');
// console.log(request);

// const getCountrydata = function(country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`) // restituisce una promise
//     .then(function(response) { // then gestisce la promise
//     return response.json(); // response.json restituisce un'altra promise
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

// const getCountrydata = function(country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`) // restituisce una promise
//     .then(response => {
//       console.log(response);
//       if(!response.ok)
//         throw new Error(`Country not found (${response.status})`) // throw respinge immediatamente la promise
//       return response.json(); // response.json restituisce un'altra promise
//     })
//     .then(data => {
//       renderCountry(data[0]);
//         const neighbour = data[0].borders[0]
//       if(!neighbour) return;
//
//       //Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.log(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`); // raccoglie gli errori di tutta la chain
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// btn.addEventListener('click', function() {
//   getCountrydata('portugal')
// });
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
// btn.addEventListener('click', function() {
//   getCountrydata('portugal');
// });

getCountrydata('australia');

 */
///////////////////////////////////////////////////////////////////////////
// Microtasks priority
/*
console.log('Test start'); // ordine di esecusione: 1
setTimeout(() => console.log('0 sec timer'), 0); // ordine di esecuzione 4
Promise.resolve('Resolved promise 1').then(res => console.log(res)); // ordine di esecuzione: 3 (perchè in microtasks)
console.log('Test end'); // ordine di esecuzione: 2
*/

/*
//la function in Promise é la "execution function" e determina la asicronicità della funzione
const lotteryPromise = new Promise(function(resolve, reject) {

  console.log('Lottery draw is happening 🔮');
  setTimeout(function() {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰'); // fulfilled promise cioè risolta. Gli argomenti sono equivalenti al .then -> res
    } else {
      reject(new Error('You lost your money 💩')); // err, intercettata da catch
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifyng setTimeout
const wait = function(seconds) {
  return new Promise(function(resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2).then(() => {
  console.log('I waited 2 seconds'); // esecuzione 1
  return wait(1);
}).then(() => console.log('I waited 1 second')); // esecuzione 2

// esecuzione
wait(2).then(() => {
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

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/

console.log('Getting position'); // happen first
const getPosition = function() {
  return new Promise(function(resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    // equivalente
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
// getPosition().then(pos => console.log(pos));

const whereAmI = function() {
  getPosition().then(pos => {
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

whereAmI();



