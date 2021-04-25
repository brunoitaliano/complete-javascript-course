// importing module
/*
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// addToCart('bread', 5);
// console.log(price, tq);

console.log('Importing Module');

// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

import add, {cart} from './shoppingCart.js';
add ('pizza', 2);
add ('bread', 5);
add ('apples', 4);

console.log(cart); // restituisce l'array cart con tutti gli elementi aggiunti!
*/

const ShoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function(product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} added to cart (shipping cost is ${shippingCost})`);
  };
  const orderStock = function(product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  }

})();

ShoppingCart2.addToCart('apple', 4)
ShoppingCart2.addToCart('pizza', 2)
console.log(ShoppingCart2);


// if (module.hot) {
//   module.hot.accept();
// }

class Person {
  greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.greeting}, ${this.name}`);
  }
}
const jonas = new Person('Jonas');

import 'core-js/stable';
import 'regenerator-runtime/runtime';




