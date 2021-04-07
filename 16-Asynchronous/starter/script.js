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


