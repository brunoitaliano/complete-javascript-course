'use strict';

const bookings = [];

const createBooking = function (flightNum, numPassenger = 1, price = 199) {
    //Default values in old way before ES6
    // numPassenger = numPassenger || 1;
    // price = price || 199;

    //Default values in ES6 way directly in arguments and are DINAMIC
    // so, for example: function (flightNum, numPassenger = 1, price = 199 * numPassenger)


    const booking = {
        flightNum,
        numPassenger,
        price
    }
    console.log(booking);
    bookings.push(booking);
}

createBooking('LH123', 2);
createBooking('LH123', undefined,  2); //trucco per saltare parametro
