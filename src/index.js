import { Pizza } from './pizza.js'
import { PizzaList } from './pizza-list.js'
import { toppings } from './toppings.js'


var x = document.getElementsByClassName('toto')
console.log(x)

var pizzaList = new PizzaList()

var pizza = null

var h2 = document.getElementById('pizza')

document.getElementById('createPizza').addEventListener('click', function (evt) {
  pizza = new Pizza('test')
  h2.innerHTML = pizza.name + ' ' + pizza.toppings2string()
}, false)

var toppingsButtons = document.getElementById('toppings')
Object.keys(toppings).forEach(topping => {

  const toppingButton = document.createElement('button')
  toppingButton.innerHTML = topping

  toppingButton.addEventListener('click', evt => {
    pizza.addTopping(topping)
    console.log(pizza)
  })

  toppingsButtons.appendChild(toppingButton)

})

// document.getElementById('eggs').addEventListener('click', function (evt) {
//   pizza.addTopping('eggs')
//   console.log(this.getAttribute('data')
//   h2.innerHTML = pizza.name + ' ' + pizza.toppings2string()
// }, false)


// pizzaList.addPizza(
//   new Pizza('Funghi')
//     .addTopping('tomato sauce')
//     .addTopping('mozzarella')
//     .addTopping('mushrooms')
// )

// pizzaList.pizzas[0]
//   .cook(2000)
//   .then(() => {
//     console.log('Bing ! Pizza cuite')
//   })
//   .catch(err => {
//     console.log(err)
//   })

// setTimeout(function () {
//   pizzaList.pizzas[0]
//     .cook(1000)
//     .then(() => {
//       console.log('Bing ! Pizza cuite')
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }, 1000)

// setTimeout(function () {
//   pizzaList.pizzas[0]
//     .cook(1000)
//     .then(() => {
//       console.log('Bing ! Pizza cuite')
//     })
//     .catch(err => {
//       console.log(err)
//     })
// }, 2500)



// pizzaList.getPizzas()
//   .then(pizzas => {
//     pizzas = pizzas.map(p => new Pizza(p.name, p.toppings))
//     pizzas[0]
//       .cook(1000)
//         .then(() => {
//           console.log('Bing ! Pizza cuite')
//           return pizzas[1].cook(1000)
//         })
//         .then(() => {
//           console.log('Bing ! Pizza cuite')
//         })
//   })

// pizzaList.pizzas[0].cook(5000)
//   .then(() => {
//     console.log('Pizza cuite')
//   })

